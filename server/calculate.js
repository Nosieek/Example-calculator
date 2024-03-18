const express = require('express');
const router = express.Router();
const isNumber = require('./isNumber');

router.post('/calculate', (req, res) => {
    const { expression } = req.body;
    const precedence = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
    };

    if (!expression){
        return res.status(400).json({ error: 'Expression is empty!' });
    }

    const parts = expression.match(/[+\-*/]|\d+(\.\d+)?/g);

    if (!parts || parts.length < 3) {
        return res.status(400).json({ error: 'Invalid expression' });
    }

    const operatorsStack = [];
    const operandsStack = [0];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];


        console.log("Operand stack: ",operandsStack)
        console.log("Operators stack: ",operatorsStack)
        if (isNumber(part)) {
            operandsStack.push(parseFloat(part));
            //obsluge brackets dodamy pozniej
        } else if (['+', '-', '*', '/'].includes(part)) {
            while (
                operatorsStack.length > 0 &&
                precedence[operatorsStack[operatorsStack.length - 1]] >= precedence[part]
                ) {

                performOperation(operandsStack, operatorsStack);
            }
            operatorsStack.push(part);

        } else {
            return res.status(400).json({ error: 'Invalid operator!' });
        }
    }

    while (operatorsStack.length > 0) {
        performOperation(operandsStack, operatorsStack);
    }
    const roundedResult = parseFloat((operandsStack.pop()).toFixed(2));
    res.json({ result: roundedResult });
});

function performOperation(operandsStack, operatorsStack) {
    const operator = operatorsStack.pop();
    const operand2 = operandsStack.pop();
    const operand1 = operandsStack.pop();

    switch (operator) {
        case '+':
            operandsStack.push(operand1 + operand2);
            break;
        case '-':
            operandsStack.push(operand1 - operand2);
            break;
        case '*':
            operandsStack.push(operand1 * operand2);
            break;
        case '/':
            operandsStack.push(operand1 / operand2);
            break;
        default:
            throw new Error('Invalid operator');
    }
}

module.exports = router;
