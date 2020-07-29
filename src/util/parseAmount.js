import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { UnsupportedAmountError } from '../Error';

export default (amount) => {
    if (amount === '' || amount === null) {
        return null;
    }

    if (isNumber(amount)) {
        return amount;
    }

    if (isString(amount)) {
        let formattedAmount = amount.replace(',', '.');

        if (formattedAmount.split('.').length > 2) {
            throw new UnsupportedAmountError(`Invalid amount: ${amount}`);
        }

        if (!formattedAmount.match(/^[-+]?\d+(\.\d+)?$/)) {
            throw new UnsupportedAmountError(`Amount has invalid chars: ${amount}`);
        }

        formattedAmount = formattedAmount.replace(/^([-+]?)0+(\d)/, '$1$2');

        return formattedAmount !== '' ? formattedAmount : null;
    }

    throw new UnsupportedAmountError(`Amount is neither string nor number: ${amount}`);
};
