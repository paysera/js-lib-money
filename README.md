# @paysera/money

Instead of storing prices, profit and any other amount of money in float or integer variable, use Money value object instead. It groups amount with currency, as amount without currency does not give much information.

Basically this library is copy of other great php [library](https://github.com/paysera/lib-money)

For math it use [bignumber.js](https://github.com/MikeMcl/bignumber.js/) library.

## Installation
```shell
npm i @paysera/money
```

## Usage
```js
import { Money } from '@paysera/money';

const money = new Money(1, 'EUR');
const timesTwo = money->mul(2);
money.isLt(timesTwo);
```

## API

`Money` class provides self-contained logic for arithmetic and comparison operations with other `Money` instances. All arithmetic operations returns new `Money` instance.

* `Money::add` - adds current Money amount to given; throws exception if currencies are different.
* `Money::sub` - subtracts given Money amount from current Money amount; throws exception if currencies are different.
* `Money::mul` - multiplies current money amount by given multiplier.
* `Money::div` - divides current money amount by given divisor.
* `Money::negate` - negates current money amount.
* `Money::round` - rounds current money amount to given number of decimal places; if no precision is given, rounds to maximum precision for current currency.
* `Money::ceil` - rounds current money amount to ceil; if no precision is given, rounds to maximum precision for current currency.
* `Money::floor` - rounds current money amount to floor; if no precision is given, rounds to maximum precision for current currency.
* `Money::isGt` - tells if current money is greater than given.
* `Money::isGte` - tells if current money is greater or equal than given.
* `Money::isLt` - tells if current money is less than given.
* `Money::isLte` - tells if current money is less or equal than given.
* `Money::isEqual` - tells if current money is equal to given.
* `Money::isNegative` - tells if current money is negative.
* `Money::isPositive` - tells if current money is positive.
* `Money::isZero` - tells if current money has zero amount.
* `Money::isSameCurrency` - tells if current money has same currency as given.
* `Money::abs` - returns money with absolute amount.
* `Money::getAsString` - returns string with concatenated amount and currency separated by space.
* `Money::getFraction` - returns number of decimal places supported by given currency.
