import Money from '../Money';
import { DifferentCurrenciesError, MoneyError, UnsupportedAmountError, UnsupportedCurrencyError } from '../Error';

const moneyOperationTestCases = (testCases, operation, testName, testImplementation) => {
    describe(`${operation}`, () => {
        test.each(testCases)(
            `${testName}`,
            testImplementation,
        );
    });
};


moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), new Money('1', 'EUR'), new Money('2', 'EUR')],
        [new Money('-1', 'EUR'), new Money('-1', 'EUR'), new Money('-2', 'EUR')],
        [new Money('1', 'USD'), new Money('-1', 'USD'), new Money('0', 'USD')],
        [new Money('-1', 'RUB'), new Money('1', 'RUB'), new Money('0', 'RUB')],
        [new Money('0.5', 'EUR'), new Money('0.5', 'EUR'), new Money('1', 'EUR')],
        [new Money('-0.5', 'EUR'), new Money('-0.5', 'EUR'), new Money('-1', 'EUR')],
        [new Money('-0.5', 'RUB'), new Money('0', 'RUB'), new Money('-0.5', 'RUB')],
        [new Money('-0', 'USD'), new Money('0', 'USD'), new Money('0', 'USD')],
        [new Money('0.000001', 'XAU'), new Money('0.000010', 'XAU'), new Money('0.000011', 'XAU')],
        [new Money('-0.0001', 'XAG'), new Money('0.0001', 'XAG'), new Money('0', 'XAG')],
    ],
    'add',
    '.add(%j, %j) => %j',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.add(rightOperand)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'USD'), new Money('2', 'EUR'), DifferentCurrenciesError],
    ],
    'add throws exception',
    '.add(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.add(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), new Money('1', 'EUR'), new Money('0', 'EUR')],
        [new Money('1', 'USD'), new Money('-1', 'USD'), new Money('2', 'USD')],
        [new Money('-1', 'RUB'), new Money('1', 'RUB'), new Money('-2', 'RUB')],
        [new Money('0.5', 'EUR'), new Money('0.5', 'EUR'), new Money('0', 'EUR')],
        [new Money('-0.5', 'EUR'), new Money('-0.5', 'EUR'), new Money('0', 'EUR')],
        [new Money('-0.5', 'RUB'), new Money('0', 'RUB'), new Money('-0.5', 'RUB')],
        [new Money('-0', 'USD'), new Money('0', 'USD'), new Money('0', 'USD')],
    ],
    'sub',
    '.sub(%j, %j) => %j',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.sub(rightOperand)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'USD'), new Money('1', 'EUR'), DifferentCurrenciesError],
    ],
    'sub throws error',
    '.sub(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.sub(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), '1', new Money('1', 'EUR')],
        [new Money('-1', 'EUR'), '-1', new Money('1', 'EUR')],
        [new Money('1', 'USD'), '-1', new Money('-1', 'USD')],
        [new Money('-1', 'RUB'), '1', new Money('-1', 'RUB')],
        [new Money('0.5', 'EUR'), '0.5', new Money('0.25', 'EUR')],
        [new Money('-0.5', 'EUR'), '-0.5', new Money('0.25', 'EUR')],
        [new Money('-0.5', 'RUB'), '0', new Money('0', 'RUB')],
        [new Money('-0', 'USD'), '0', new Money('0', 'USD')],
    ],
    'mul',
    '.mul(%j, %d) => %j',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.mul(rightOperand)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), '1', new Money('1', 'EUR')],
        [new Money('1', 'EUR'), '2', new Money('0.5', 'EUR')],
        [new Money('1', 'EUR'), '3', new Money('0.333333', 'EUR')],
        [new Money('-1', 'EUR'), '-1', new Money('1', 'EUR')],
        [new Money('1', 'USD'), '-1', new Money('-1', 'USD')],
        [new Money('-1', 'RUB'), '1', new Money('-1', 'RUB')],
        [new Money('0.5', 'EUR'), '0.5', new Money('1', 'EUR')],
        [new Money('-0.5', 'EUR'), '-0.5', new Money('1', 'EUR')],
    ],
    'div',
    '.div(%j, %d) => %j',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.div(rightOperand)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), 0, MoneyError],
    ],
    'div throws error',
    '.div(%j, %d) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.div(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('1.0', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('1.00100', 'EUR'), new Money('1.0010', 'EUR'), true],
        [new Money('-1', 'EUR'), new Money('-1', 'EUR'), true],
        [new Money('-1.0', 'EUR'), new Money('-1', 'EUR'), true],
        [new Money('-1.00100', 'EUR'), new Money('-1.00100', 'EUR'), true],
        [new Money('1', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('0', 'USD'), new Money('0', 'EUR'), true],
        [new Money('0.00', 'USD'), new Money('0', 'EUR'), true],
    ],
    'isEqual',
    '.isEqual(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.isEqual(rightOperand)).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('0', 'EUR'), new Money('-1', 'EUR'), true],
        [new Money('1', 'USD'), new Money('0', 'USD'), true],
        [new Money('2', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('2', 'EUR'), new Money('1.999999', 'EUR'), true],
        [new Money('1.00', 'EUR'), new Money('0.9999999', 'EUR'), true],
        [new Money('1.00', 'EUR'), new Money('0.99999999999999999', 'EUR'), true],
    ],
    'isGt',
    '.isGt(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.isGt(rightOperand)).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'USD'), new Money('1', 'EUR'), DifferentCurrenciesError],
    ],
    'isGt throws error',
    '.isGt(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.isGt(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('2', 'USD'), new Money('1', 'USD'), true],
    ],
    'isGte',
    '.isGt(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.isGte(rightOperand)).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'USD'), new Money('1', 'EUR'), DifferentCurrenciesError],
    ],
    'isGte throws error',
    '.isGte(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.isGte(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('-1', 'EUR'), new Money('0', 'EUR'), true],
        [new Money('0', 'USD'), new Money('1', 'USD'), true],
        [new Money('1', 'EUR'), new Money('2', 'EUR'), true],
        [new Money('0', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('5', 'EUR'), new Money('6.55', 'EUR'), true],
    ],
    'isLt',
    '.isLt(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.isLt(rightOperand)).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'USD'), new Money('1', 'EUR'), DifferentCurrenciesError],
    ],
    'isLt throws error',
    '.isLt(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.isLt(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('-1', 'EUR'), new Money('0', 'EUR'), true],
        [new Money('1', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('1.00', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('1.00100', 'EUR'), new Money('1.0010', 'EUR'), true],
        [new Money('1', 'USD'), new Money('2', 'USD'), true],
    ],
    'isLte',
    '.isLte(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.isLte(rightOperand)).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'USD'), new Money('1', 'EUR'), DifferentCurrenciesError],
    ],
    'isLte throws error',
    '.isLte(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(() => leftOperand.isLte(rightOperand)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), new Money('1', 'EUR'), true],
        [new Money('1', 'EUR'), new Money('2', 'EUR'), true],
        [new Money('3', 'EUR'), new Money('3', 'EUR'), true],
        [new Money('1', 'USD'), new Money('1', 'USD'), true],
        [new Money('1', 'USD'), new Money('-1.01', 'USD'), true],
        [new Money('1', 'USD'), new Money('15', 'USD'), true],
    ],
    'isSameCurrency',
    '.isSameCurrency(%j, %j) => %s',
    (leftOperand, rightOperand, expected) => {
        expect(leftOperand.isSameCurrency(rightOperand)).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), new Money('-1', 'EUR')],
        [new Money('-1', 'EUR'), new Money('1', 'EUR')],
        [new Money('-1.9910', 'EUR'), new Money('1.991', 'EUR')],
        [new Money('0', 'EUR'), new Money('0', 'EUR')],
    ],
    'negate',
    '.negate(%j) => %j',
    (operand, expected) => {
        expect(operand.negate()).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('10.548', 'EUR'), null, new Money('10.55', 'EUR')],
        [new Money('35', 'EUR'), null, new Money('35.00', 'EUR')],
        [new Money('35.13', 'EUR'), null, new Money('35.13', 'EUR')],
        [new Money('-10.548', 'EUR'), null, new Money('-10.54', 'EUR')],
        [new Money('0.01', 'EUR'), null, new Money('0.01', 'EUR')],
        [new Money('4.12', 'EUR'), 0, new Money('5', 'EUR')],
        [new Money('8.88', 'EUR'), 0, new Money('9', 'EUR')],
    ],
    'ceil',
    '.ceil(%j, %d) => %j',
    (money, precision, expected) => {
        expect(money.ceil(precision)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('10.548', 'EUR'), null, new Money('10.54', 'EUR')],
        [new Money('35', 'EUR'), null, new Money('35.00', 'EUR')],
        [new Money('35', 'OMR'), null, new Money('35.000', 'OMR')],
        [new Money('35.12', 'EUR'), null, new Money('35.12', 'EUR')],
        [new Money('-10.548', 'EUR'), null, new Money('-10.55', 'EUR')],
        [new Money('0.01', 'EUR'), null, new Money('0.01', 'EUR')],
        [new Money('1.15', 'EUR'), 0, new Money('1', 'EUR')],
        [new Money('2.99', 'EUR'), 0, new Money('2', 'EUR')],
    ],
    'floor',
    '.floor(%j, %d) => %j',
    (money, precision, expected) => {
        expect(money.floor(precision)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('10.544', 'EUR'), new Money('10.54', 'EUR')],
        [new Money('-10.544', 'EUR'), new Money('-10.54', 'EUR')],
        [new Money('10.545', 'EUR'), new Money('10.55', 'EUR')],
        [new Money('-10.545', 'EUR'), new Money('-10.55', 'EUR')],
    ],
    'round',
    '.round(%j) => %j',
    (money, expected) => {
        expect(money.round()).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('0.000005', 'EUR'), new Money('0.000005', 'EUR')],
        [new Money('-0.000005', 'EUR'), new Money('0.000005', 'EUR')],
    ],
    'abs',
    '.abs(%j) => %j',
    (money, expected) => {
        expect(money.abs()).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('0', 'EUR'), 0, '.', null, '0'],
        [new Money('0', 'EUR'), 1, '.', null, '0.0'],
        [new Money('0', 'EUR'), 2, '.', null, '0.00'],
        [new Money('0', 'EUR'), 2, '', null, '000'],

        [new Money('1', 'EUR'), 0, '.', null, '1'],
        [new Money('1', 'EUR'), 1, '.', null, '1.0'],
        [new Money('1', 'EUR'), 2, '.', null, '1.00'],
        [new Money('1', 'EUR'), 2, '', null, '100'],

        [new Money('1.123', 'EUR'), 0, '.', null, '1'],
        [new Money('1.123', 'EUR'), 1, '.', null, '1.1'],
        [new Money('1.123', 'EUR'), 2, '.', null, '1.12'],
        [new Money('1.123', 'EUR'), 2, '', null, '112'],
        [new Money('1.123445', 'EUR'), 2, '.', null, '1.12'],
        [new Money('1.120000', 'EUR'), 2, '.', null, '1.12'],

        [new Money('12.3', 'EUR'), 0, '', null, '12'],
        [new Money('12.3', 'EUR'), 1, '', null, '123'],
        [new Money('12.3', 'EUR'), 2, '', null, '1230'],
        [new Money('12.3', 'EUR'), 3, '', null, '12300'],
        [new Money('12', 'EUR'), 2, '', null, '1200'],

        [new Money('1200.3', 'EUR'), 3, '', null, '1200300'],
        [new Money('1200', 'EUR'), 2, '', null, '120000'],
        [new Money('1200.3', 'EUR'), 3, '', ',', '1,200300'],
        [new Money('1200.3', 'EUR'), 3, '.', ',', '1,200.300'],
        [new Money('1200.3', 'EUR'), 3, ':', '/', '1/200:300'],
        [new Money('1200', 'EUR'), 2, '', ',', '1,20000'],

        [new Money('1200.01', 'BYR'), 0, ',', null, '1200'],
    ],
    'formatAmount',
    '.formatAmount(%j, %d, %s, %s) => %s',
    (money, fraction, decimalSeparator, thousandsSeparator, expected) => {
        expect(money.formatAmount(
            fraction,
            decimalSeparator,
            thousandsSeparator,
        )).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), '1.00 EUR'],
        [new Money('1.123456', 'EUR'), '1.12 EUR'],
        [new Money('1.120000', 'EUR'), '1.12 EUR'],
        [new Money('-1.120001', 'EUR'), '-1.12 EUR'],
    ],
    'getAsString',
    '.getAsString(%j) => %s',
    (money, expected) => {
        expect(money.getAsString()).toBe(expected);
    },
);

moneyOperationTestCases(
    [
        ['USD', new Money('0', 'USD')],
        ['EUR', new Money('0', 'EUR')],
    ],
    'createZero',
    '.createZero(%s) => %j',
    (currency, expected) => {
        expect(Money.createZero(currency)).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        ['0', 'EUR'],
        ['-0', 'EUR'],
        ['+0', 'EUR'],
        ['-0.000', 'EUR'],
        ['+0.000', 'EUR'],
        ['0.123', 'EUR'],
        ['123.991', 'EUR'],
        ['12.21', 'EUR'],
        ['12', 'EUR'],
        ['-12', 'EUR'],
        ['+12', 'EUR'],
        ['12.000000', 'EUR'],
    ],
    'create money',
    '.create(%s, %s) => %s, %s',
    (amount, currency) => {
        const money = Money.create(amount, currency);

        expect(money.getAmount()).toEqual(amount);
        expect(money.getCurrency()).toEqual(currency);
    },
);

moneyOperationTestCases(
    [
        ['0+', 'EUR', UnsupportedAmountError],
        ['0-', 'EUR', UnsupportedAmountError],
        ['0.00+', 'EUR', UnsupportedAmountError],
        ['0.00-', 'EUR', UnsupportedAmountError],
        ['0.0+001', 'EUR', UnsupportedAmountError],
        ['0.0-001', 'EUR', UnsupportedAmountError],
        ['1+.-1', 'EUR', UnsupportedAmountError],
        ['1-1', 'EUR', UnsupportedAmountError],
        ['1.', 'EUR', UnsupportedAmountError],
        ['10.', 'EUR', UnsupportedAmountError],
        ['0LTL', 'EUR', UnsupportedAmountError],
        ['0.00LTL', 'EUR', UnsupportedAmountError],
        ['0.0EUR001', 'EUR', UnsupportedAmountError],
        ['LTL', 'EUR', UnsupportedAmountError],
        ['.0', 'EUR', UnsupportedAmountError],
        ['U.0', 'EUR', UnsupportedAmountError],
        ['-1.E1', 'EUR', UnsupportedAmountError],
        ['+1.100000000000E1', 'EUR', UnsupportedAmountError],
        ['1.22222222222222E+E', 'EUR', UnsupportedAmountError],
        ['+1.100000000000e1', 'EUR', UnsupportedAmountError],
        ['1.22222222222222e+e', 'EUR', UnsupportedAmountError],
    ],
    'create money throws error',
    '.create(%s, %s) => %s',
    (amount, currency, expected) => {
        expect(() => Money.create(amount, currency)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [1, 'XXX', UnsupportedCurrencyError],
        ['1', 'XXX', UnsupportedCurrencyError],
        [null, 'XXX', UnsupportedCurrencyError],
    ],
    'create money with unsupported currency',
    '.create(%s, %s) => %s',
    (amount, currency, expected) => {
        expect(() => new Money(amount, currency)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [1, null, UnsupportedCurrencyError],
        ['1', null, UnsupportedCurrencyError],
        [null, null, UnsupportedCurrencyError],
        [1, '', UnsupportedCurrencyError],
        ['1', '', UnsupportedCurrencyError],
        [null, '', UnsupportedCurrencyError],
    ],
    'create money without currency',
    '.create(%s, %s) => %s',
    (amount, currency, expected) => {
        expect(() => new Money(amount, currency)).toThrowError(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money('1', 'EUR'), 100],
        [new Money('10', 'AMD'), 10],
        [new Money('100', 'AOA'), 1000],
        [new Money('1000', 'BHD'), 1000000],
    ],
    'get amount in cents',
    '.getAmountInCents(%j) => %d',
    (money, expected) => {
        expect(money.getAmountInCents()).toEqual(expected);
    },
);

moneyOperationTestCases(
    [
        [new Money(`${Number.MAX_SAFE_INTEGER}9`, 'EUR'), MoneyError],
        [new Money(`${Number.MAX_SAFE_INTEGER}9`, 'AMD'), MoneyError],
        [new Money(`${Number.MAX_SAFE_INTEGER}9`, 'AOA'), MoneyError],
        [new Money(`${Number.MAX_SAFE_INTEGER}9`, 'BHD'), MoneyError],
    ],
    'get amount in cents throws error',
    '.getAmountInCents(%j) => %s',
    (money, expected) => {
        expect(() => money.getAmountInCents()).toThrowError(expected);
    },
);
