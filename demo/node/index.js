const PayseraMoney = require('../../dist/main');

const moneyA = new PayseraMoney.Money('1', 'EUR');
const moneyB = new PayseraMoney.Money('2', 'EUR');

const addResult = moneyA.add(moneyB);
console.log(`${moneyA.getAsString()} + ${moneyB.getAsString()} = ${addResult.getAsString()}`);

const subResult = moneyA.sub(moneyB);
console.log(`${moneyA.getAsString()} - ${moneyB.getAsString()} = ${subResult.getAsString()}`);
