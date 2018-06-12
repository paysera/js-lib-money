const moneyA = new PayseraMoney.Money('1', 'EUR');
const moneyB = new PayseraMoney.Money('3', 'EUR');

const operationsTable = document.getElementById('operations');

const listOfOperations = [
    ['add', moneyA, moneyB, moneyA.add(moneyB)],
    ['sub', moneyA, moneyB, moneyA.sub(moneyB)],
];
listOfOperations.forEach(([operation, operandA, operandB, result]) => {
    const row = document.createElement('tr');

    const operationCell = document.createElement('td');
    operationCell.innerHTML = operation;

    const operandACell = document.createElement('td');
    operandACell.innerHTML = operandA.getAsString();

    const operandBCell = document.createElement('td');
    operandBCell.innerHTML = operandB.getAsString();

    const resultCell = document.createElement('td');
    resultCell.innerHTML = result.getAsString();

    row.appendChild(operationCell);
    row.appendChild(operandACell);
    row.appendChild(operandBCell);
    row.appendChild(resultCell);

    operationsTable.appendChild(row);
});
