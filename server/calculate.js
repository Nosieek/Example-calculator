const express = require('express');
const router = express.Router();
const isNumber = require('./isNumber')

router.post('/calculate', (req, res) => {
    const { operation, num1, num2 } = req.body;

    let result;
    if(isNumber(num1) && isNumber(num2)){
        switch (operation) {
            case 'add':
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case 'subtract':
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case 'multiply':
                result = (num1 * num2).toFixed(2);
                break;
            case 'divide':
                if (num2 !== 0) {
                    result = (num1 / num2).toFixed(2);
                } else {
                    return res.status(400).json({ error: 'Cannot divide by zero' });
                }
                break;
            default:
                return res.status(400).json({ error: 'Invalid operation' });
        }
    }else{
        return res.status(400).json({ error: 'Invalid number' });
    }


    res.json({ result: parseFloat(result) });
})

module.exports = router;