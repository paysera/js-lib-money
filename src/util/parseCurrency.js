import { isUndefined } from 'lodash-es';
import { UnsupportedCurrencyError } from '../Error';
import fractions from '../fractions';

export default (currency) => {
    if (currency === null || currency === '') {
        throw new UnsupportedCurrencyError(`Currency not provided`);
    }
    const upperCaseCurrency = currency.toUpperCase();

    if (isUndefined(fractions[upperCaseCurrency])) {
        throw new UnsupportedCurrencyError(`Unsupported currency: ${currency}`);
    }

    return upperCaseCurrency;
};
