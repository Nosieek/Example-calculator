import React, { useState } from 'react';
import './Calculator.css'
const Calculator = () => {
    const [calculation, setCalculation] = useState({
        expression: '',
        display: '',
        result: null,
        error: null,
    });

    const handleClear = () =>{
        setCalculation({
            expression: '',
            display: '',
            result: null,
            error: null,
        })
    }
    const operators = ['+','-','*','/','(',')','.'];
    const handleButtonClick = (value) => {
        if (operators.includes(value)){
            setCalculation({
                ...calculation,
                expression: calculation.expression + value,
                display: calculation.display + value
            });
        } else {
            if (calculation.display === '') {
                setCalculation({
                    ...calculation,
                    expression: calculation.expression + value,
                    display: parseFloat(value).toString()
                });
            } else {
                setCalculation({
                    ...calculation,
                    expression: calculation.expression + value,
                    display: calculation.display + parseFloat(value).toString()
                });
            }
        }
    };


    const handleCalculate = async () => {
        try {
            const response = await fetch('http://localhost:4848/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(calculation),
            });

            if (response.ok) {
                const data = await response.json();
                setCalculation({
                    ...calculation,
                    expression: data.result.toString(), //podmieniamy exp oraz display po znaku =
                    display: data.result.toString(),
                    result: data.result,
                    error: null });
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
        <div className="calculator">
            <div className="display-container">
                {/*popraw tutaj ma byc Err jezeli cos jest nie tak*/}
                <div className="display"> 
                    {calculation.display}
                </div>
            </div>

            <div className="row" id="row2">
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button id="operand" onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div className="row" id="row3">
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button id="operand" onClick={() => handleButtonClick('*')}>*</button>
            </div>
            <div className="row" id="row4">
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button id="operand" onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div className="row" id="row5">
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button onClick={handleClear}>C</button>
                <button id="operand" onClick={() => handleButtonClick('+')}>+</button>
            </div>
            <div className="row" id="row6">
                <button id="operand" onClick={handleCalculate}>=</button>
            </div>

        </div>
    );
};

export default Calculator;
