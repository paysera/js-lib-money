import { isString, isNumber, isUndefined } from 'lodash-es';

import fractions from './fractions';
import { DifferentCurrenciesError, MoneyError, UnsupportedAmountError, UnsupportedCurrencyError } from './Error';
import BigNumberMath from './BigNumberMath';

const DEFAULT_DECIMAL_PLACES = 6;

let mathInstance = null;

export default class Money {
    /**
     * @param {?(string|number)} amount
     * @param {?string} currency
     * @param {?number} decimalPlaces
     */
    constructor(amount = null, currency = null, decimalPlaces = null) {
        this.amount = null;
        this.currency = null;
        this.decimalPlaces = decimalPlaces === null ? DEFAULT_DECIMAL_PLACES : decimalPlaces;

        if (amount !== null) {
            this.setAmount(amount);
        }
        if (currency !== null) {
            this.setCurrency(currency);
        }
    }

    /**
     * @param {(string|number)} amount
     *
     * @returns {Money}
     */
    setAmount(amount) {
        if (amount === '' || amount === null) {
            this.amount = null;
        } else if (isNumber(amount)) {
            this.amount = amount;
        } else if (isString(amount)) {
            let formattedAmount = amount.replace(',', '.');

            if (formattedAmount.split('.').length > 2) {
                throw new UnsupportedAmountError(`Invalid amount: ${amount}`);
            }

            if (!formattedAmount.match(/^[-+]?\d+(\.\d+)?$/)) {
                throw new UnsupportedAmountError(`Amount has invalid chars: ${amount}`);
            }

            formattedAmount = formattedAmount.replace(/^([-+]?)0+(\d)/, '$1$2');

            this.amount = formattedAmount !== '' ? formattedAmount : null;
        } else {
            throw new UnsupportedAmountError(`Amount is neither string nor number: ${amount}`);
        }

        return this;
    }

    /**
     * @returns {null|string}
     */
    getAmount() {
        return this.amount;
    }

    /**
     * @throws {MoneyError}
     *
     * @returns {number|null}
     */
    getAmountInCents() {
        if (this.amount === null) {
            return null;
        }

        const result = this.getMath()
            .floor(this.getMath().mul(this.amount, (10 ** this.getFraction(this.currency))));
        const integerRepresentation = parseInt(result, 10);
        if (integerRepresentation.toString() !== result) {
            throw new MoneyError('Amount is too large to be returned as integer');
        }

        return integerRepresentation;
    }

    /**
     * @param {string} currency
     *
     * @returns {Money}
     */
    setCurrency(currency) {
        const upperCaseCurrency = currency.toUpperCase();

        if (isUndefined(fractions[upperCaseCurrency])) {
            throw new UnsupportedCurrencyError(`Unsupported currency: ${currency}`);
        }

        this.currency = upperCaseCurrency;

        return this;
    }

    /**
     * @returns {null|string}
     */
    getCurrency() {
        return this.currency;
    }

    /**
     * @param {Money} money
     *
     * @returns {Money}
     */
    add(money) {
        this.throwErrorIfNotSameCurrency(money);

        return new Money(
            this.getMath().add(this.getAmount(), money.getAmount()),
            this.getCurrency(),
        );
    }

    /**
     * @param {Money} money
     * @returns {Money}
     */
    sub(money) {
        this.throwErrorIfNotSameCurrency(money);

        return new Money(
            this.getMath().sub(this.getAmount(), money.getAmount()),
            this.getCurrency(),
        );
    }

    /**
     * @param {(string|number)} multiplier
     *
     * @returns {Money}
     */
    mul(multiplier) {
        return new Money(
            this.getMath().mul(this.getAmount(), multiplier),
            this.getCurrency(),
        );
    }

    /**
     * @param {(string|number)} divisor
     *
     * @returns {Money}
     */
    div(divisor) {
        if (divisor === '0' || divisor === 0) {
            throw new MoneyError('Division by zero');
        }

        return new Money(
            this.getMath().div(this.getAmount(), divisor),
            this.getCurrency(),
        );
    }

    /**
     * @returns {Money}
     */
    negate() {
        return this.mul(-1);
    }

    /**
     * @param {?number} precision
     *
     * @returns {Money}
     */
    round(precision = null) {
        return new Money(
            this.getMath().round(this.getAmount(), this.getCurrencyFraction(this.getCurrency(), precision)),
            this.getCurrency(),
        );
    }

    /**
     * @param {?number} precision
     *
     * @returns {Money}
     */
    ceil(precision = null) {
        return new Money(
            this.getMath().ceil(this.getAmount(), this.getCurrencyFraction(this.getCurrency(), precision)),
            this.getCurrency(),
        );
    }

    /**
     * @param {?number} precision
     *
     * @returns {Money}
     */
    floor(precision = null) {
        return new Money(
            this.getMath().floor(this.getAmount(), this.getCurrencyFraction(this.getCurrency(), precision)),
            this.getCurrency(),
        );
    }

    /**
     * @returns {Money}
     */
    abs() {
        return new Money(
            this.getMath().abs(this.getAmount()),
            this.getCurrency(),
        );
    }

    /**
     * @param {Money} money
     *
     * @returns {boolean}
     */
    isGt(money) {
        this.throwErrorIfNotSameCurrency(money);

        return this.getMath().isGt(this.getAmount(), money.getAmount());
    }

    /**
     * @param {Money} money
     *
     * @returns {boolean}
     */
    isGte(money) {
        this.throwErrorIfNotSameCurrency(money);

        return this.getMath().isGte(this.getAmount(), money.getAmount());
    }

    /**
     * @param {Money} money
     *
     * @returns {boolean}
     */
    isLt(money) {
        this.throwErrorIfNotSameCurrency(money);

        return this.getMath().isLt(this.getAmount(), money.getAmount());
    }

    /**
     * @param {Money} money
     *
     * @returns {boolean}
     */
    isLte(money) {
        this.throwErrorIfNotSameCurrency(money);

        return this.getMath().isLte(this.getAmount(), money.getAmount());
    }

    /**
     * @param {Money} money
     *
     * @returns {boolean}
     */
    isEqual(money) {
        if (this.isZero() && money.isZero()) {
            return true;
        }

        if (!this.isSameCurrency(money)) {
            return false;
        }

        return this.getMath().isEqual(this.getAmount(), money.getAmount());
    }

    /**
     * @returns {boolean}
     */
    isNegative() {
        return this.getMath().isNegative();
    }

    /**
     * @returns {boolean}
     */
    isZero() {
        return this.getMath().isZero(this.getAmount());
    }

    /**
     * @returns {boolean}
     */
    isPositive() {
        return this.getMath().isPositive(this.getAmount());
    }

    /**
     * @param {Money} money
     *
     * @returns {boolean}
     */
    isSameCurrency(money) {
        return this.getCurrency() === money.getCurrency();
    }

    /**
     * @param {?number} fraction
     * @param {?string} decimalSeparator
     * @param {?string} thousandsSeparator
     *
     * @returns {string}
     */
    formatAmount(fraction = null, decimalSeparator = '.', thousandsSeparator = null) {
        const currencyFraction = this.getCurrencyFraction(this.getCurrency(), fraction);

        return this.getMath().format(
            this.getAmount(),
            currencyFraction,
            decimalSeparator === null ? '' : decimalSeparator,
            thousandsSeparator === null ? '' : thousandsSeparator,
        );
    }

    /**
     * @returns {string}
     */
    getAsString() {
        return `${this.formatAmount()} ${this.getCurrency()}`;
    }

    /**
     * @param {string} currency
     *
     * @returns {Money}
     */
    static createZero(currency) {
        return new Money('0', currency);
    }

    /**
     * @param {?(string|number|null)} amount
     * @param {?(string|null)} currency
     *
     * @returns {Money}
     */
    static create(amount = null, currency = null) {
        return new Money(amount, currency);
    }

    /**
     * @param {Money} money
     *
     * @throws {DifferentCurrenciesError}
     */
    throwErrorIfNotSameCurrency(money) {
        if (!this.isSameCurrency(money)) {
            throw new DifferentCurrenciesError(`Operand currency doesn't match (lop_currency=${this.getCurrency()}, rop_currency=${money.getCurrency()})`);
        }
    }

    /**
     * @param {string} currency
     *
     * @returns {number}
     */
    /* eslint class-methods-use-this: "off" */
    getFraction(currency) {
        const upperCaseCurrency = currency.toUpperCase();

        if (isUndefined(fractions[upperCaseCurrency])) {
            throw new UnsupportedCurrencyError('Given currency doesn\'t have fraction');
        }

        return fractions[upperCaseCurrency];
    }

    /**
     * @param {string} currency
     * @param {number|null} givenFraction
     *
     * @returns {number}
     */
    getCurrencyFraction(currency, givenFraction) {
        if (givenFraction !== null) {
            return givenFraction;
        }

        return this.getFraction(currency);
    }

    /**
     * @returns {BigNumberMath}
     */
    getMath() {
        if (mathInstance === null) {
            mathInstance = new BigNumberMath(this.decimalPlaces);
        }

        return mathInstance;
    }
}
