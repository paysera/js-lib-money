import AggregatedMoney from '../AggregatedMoney';
import Money from '../Money';

describe('testAddAll', () => {
    test.each([
        [
            [
                new Money('1', 'EUR'),
                new Money('2', 'EUR'),
            ],
            [new Money('3', 'EUR')],
        ],
        [
            [
                new Money('-10', 'EUR'),
                new Money('2', 'EUR'),
            ],
            [new Money('-8', 'EUR')],
        ],
        [
            [
                new Money('-10', 'EUR'),
                new Money('-10', 'EUR'),
            ],
            [new Money('-20', 'EUR')],
        ],
        [
            [
                new Money('1', 'EUR'),
                new Money('-2', 'EUR'),
            ],
            [new Money('-1', 'EUR')],
        ],
        [
            [
                new Money('1', 'EUR'),
                new Money('2', 'RUB'),
                new Money('3', 'USD'),
                new Money('4', 'RUB'),
            ],
            [new Money('1', 'EUR'), new Money('6', 'RUB'), new Money('3', 'USD')],
        ],
    ])(
        '.addAll(%o) => %o',
        (moneyList, expected) => {
            const aggregatedMoney = new AggregatedMoney();
            expect(aggregatedMoney.addAll(moneyList).getAll()).toEqual(expected);
        },
    );
});
