import { isUndefined } from 'lodash-es';
import { UnsupportedCurrencyError } from '../Error';
import fractions from '../fractions';

export default (currency) => {
    const upperCaseCurrency = currency.toUpperCase();

    if (isUndefined(fractions[upperCaseCurrency])) {
        throw new UnsupportedCurrencyError(`Unsupported currency: ${currency}`);
    }

    return upperCaseCurrency;
};
