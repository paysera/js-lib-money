import { isUndefined } from 'lodash-es';

import Money from './Money';

export default class AggregatedMoney {
    constructor() {
        this.moneyList = {};
    }

    /**
     * @param {Money[]} moneyList
     *
     * @returns {AggregatedMoney}
     */
    addAll(moneyList) {
        moneyList.forEach((money) => {
            this.add(money);
        });

        return this;
    }

    /**
     * @param {Money} money
     *
     * @returns {AggregatedMoney}
     */
    add(money) {
        const currency = money.getCurrency();
        let currentMoney = this.get(currency);

        if (currentMoney === null) {
            currentMoney = Money.createZero(currency);
            this.moneyList[currency] = currentMoney;
        }

        this.moneyList[currency] = currentMoney.add(money);

        return this;
    }

    /**
     * @param {string} currency
     *
     * @returns {Money|null}
     */
    get(currency) {
        return isUndefined(this.moneyList[currency]) ? null : this.moneyList[currency];
    }

    /**
     * @returns {Money[]}
     */
    getAll() {
        return Object.values(this.moneyList);
    }
}
