import { BigNumber } from 'bignumber.js';

const DEFAULT_CONFIG = {
    DECIMAL_PLACES: 20,
    FORMAT: {
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
    },
};

const createConfig = (decimalPlaces, decimalSeparator, groupSeparator) => Object.assign(
    {},
    DEFAULT_CONFIG,
    {
        DECIMAL_PLACES: decimalPlaces,
        FORMAT: Object.assign(
            {},
            DEFAULT_CONFIG.FORMAT,
            {
                decimalSeparator,
                groupSeparator,
            },
        ),
    },
);

export default class BigNumberMath {
    constructor(
        decimalPlaces = DEFAULT_CONFIG.DECIMAL_PLACES,
        decimalSeparator = DEFAULT_CONFIG.FORMAT.decimalSeparator,
        groupSeparator = DEFAULT_CONFIG.FORMAT.groupSeparator,
    ) {
        this.config = createConfig(decimalPlaces, decimalSeparator, groupSeparator);
    }

    /**
     * @param {number|string|BigNumber} n
     * @param {?object} config
     *
     * @returns {BigNumber}
     */
    createBigNumberInstance(n, config = {}) {
        const BigNumberClone = BigNumber.clone(Object.assign({}, this.config, config || {}));

        return new BigNumberClone(n);
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {string}
     */
    add(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).plus(rightOperand).toString();
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {string}
     */
    sub(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).minus(rightOperand).toString();
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {string}
     */
    div(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).dividedBy(rightOperand).toString();
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {string}
     */
    mul(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).multipliedBy(rightOperand).toString();
    }

    /**
     * @param {number|string|BigNumber} operand
     *
     * @returns {string}
     */
    abs(operand) {
        return this.createBigNumberInstance(operand).absoluteValue().toString();
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {boolean}
     */
    isGt(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).isGreaterThan(rightOperand);
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {boolean}
     */
    isGte(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).isGreaterThanOrEqualTo(rightOperand);
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {boolean}
     */
    isLt(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).isLessThan(rightOperand);
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {boolean}
     */
    isLte(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).isLessThanOrEqualTo(rightOperand);
    }

    /**
     * @param {number|string|BigNumber} leftOperand
     * @param {number|string|BigNumber} rightOperand
     *
     * @returns {boolean}
     */
    isEqual(leftOperand, rightOperand) {
        return this.createBigNumberInstance(leftOperand).isEqualTo(rightOperand);
    }

    /**
     * @param {number|string|BigNumber} operand
     *
     * @returns {boolean}
     */
    isNegative(operand) {
        return this.createBigNumberInstance(operand).isNegative();
    }

    /**
     * @param {number|string|BigNumber} operand
     *
     * @returns {boolean}
     */
    isZero(operand) {
        return this.createBigNumberInstance(operand).isZero();
    }

    /**
     * @param {number|string|BigNumber} operand
     *
     * @returns {boolean}
     */
    isPositive(operand) {
        return this.createBigNumberInstance(operand).isPositive();
    }

    /**
     * @param {number|string|BigNumber} operand
     * @param {number} precision
     *
     * @returns {string}
     */
    round(operand, precision = 2) {
        return this.createBigNumberInstance(operand).toFixed(precision).toString();
    }

    /**
     * @param {number|string|BigNumber} operand
     * @param {number} precision
     *
     * @returns {string}
     */
    ceil(operand, precision) {
        return this.createBigNumberInstance(operand).toFixed(precision, BigNumber.ROUND_CEIL).toString();
    }

    /**
     * @param {number|string|BigNumber} operand
     * @param {number} precision
     *
     * @returns {string}
     */
    floor(operand, precision = 0) {
        return this.createBigNumberInstance(operand).toFixed(precision, BigNumber.ROUND_FLOOR).toString();
    }

    /**
     * @param {number|string|BigNumber} operand
     * @param {number} precision
     * @param {string} decimalSeparator
     * @param {string} groupSeparator
     *
     * @returns {string}
     */
    format(operand, precision = 0, decimalSeparator = '.', groupSeparator = ',') {
        return this.createBigNumberInstance(
            operand,
            createConfig(precision, decimalSeparator, groupSeparator),
        ).toFormat(precision);
    }
}
