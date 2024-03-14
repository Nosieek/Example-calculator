import React, { useState } from 'react';
const Calculator = () => {
    const [calculation, setCalculation] = useState({
        operation: 'add',
        num1: '',
        num2: '',
        result: null,
        error: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCalculation({ ...calculation, [name]: value });
    };

    const handleCalculate = async () => {
        try {
            const num1 = parseFloat(calculation.num1);
            const num2 = parseFloat(calculation.num2);

            if (isNaN(num1) || isNaN(num2)) {
                setCalculation({ ...calculation, result: null, error: 'Invalid number' });
                return;
            }
            const response = await fetch('http://localhost:4848/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(calculation),
            });


            if (response.ok) {
                const data = await response.json();
                setCalculation({ ...calculation, result: data.result, error: null });
                console.log(data.result)
            } else {
                const errorData = await response.json();
                setCalculation({ ...calculation, result: null, error: errorData.error });
            }
        } catch (error) {
            console.error('Error during calculation:', error);
        }
    };

    return (
        <div>
            <h1>Calculator</h1>
            <div>
                <label>
                    Num1:
                    <input type="number" name="num1" value={calculation.num1} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Operation:
                    <select name="operation" value={calculation.operation} onChange={handleInputChange}>
                        <option value="add">Add</option>
                        <option value="subtract">Subtract</option>
                        <option value="multiply">Multiply</option>
                        <option value="divide">Divide</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Num2:
                    <input type="number" name="num2" value={calculation.num2} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <button onClick={handleCalculate}>Calculate</button>
            </div>
            {calculation.error && <p>Error: {calculation.error}</p>}
            {calculation.result && <p>Result: {calculation.result}</p>}
        </div>
    );
};

export default Calculator;
