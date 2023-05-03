import "./ScientificMode.css"
import ButtonsRow from "./ButtonsRow/ButtonsRow";
import React from "react";
const ScientificMode = () => {
    const OPERATORS = ["+", "-", "*", "/"];
    let RADIAN = true;
    let ans;
    const POWER = "POWER(", FACTORIAL = "FACTORIAL";
    const data = {
        operation: [],
        formula: [],
    }
    const calculator_buttons = [
        {
            name: "rad",
            symbol: "Rad",
            formula: false,
            type: "key",
        },
        {
            name: "deg",
            symbol: "Deg",
            formula: false,
            type: "key",
        },
        {
            name: "square-root",
            symbol: "√",
            formula: "Math.sqrt(",
            type: "math_function",
        },
        {
            name: "square",
            symbol: "x²",
            formula: POWER,
            type: "math_function",
        },
        {
            name: "open-parenthesis",
            symbol: "(",
            formula: "(",
            type: "number",
        },
        {
            name: "close-parenthesis",
            symbol: ")",
            formula: ")",
            type: "number",
        },
        {
            name: "clear",
            symbol: "C",
            formula: false,
            type: "key",
        },
        {
            name: "delete",
            symbol: "⌫",
            formula: false,
            type: "key",
        },
        {
            name: "pi",
            symbol: "π",
            formula: "Math.PI",
            type: "number",
        },
        {
            name: "cos",
            symbol: "cos",
            formula: "trigo(Math.cos,",
            type: "trigo_function",
        },
        {
            name: "sin",
            symbol: "sin",
            formula: "trigo(Math.sin,",
            type: "trigo_function",
        },
        {
            name: "tan",
            symbol: "tan",
            formula: "trigo(Math.tan,",
            type: "trigo_function",
        },
        {
            name: "7",
            symbol: 7,
            formula: 7,
            type: "number",
        },
        {
            name: "8",
            symbol: 8,
            formula: 8,
            type: "number",
        },
        {
            name: "9",
            symbol: 9,
            formula: 9,
            type: "number",
        },
        {
            name: "division",
            symbol: "÷",
            formula: "/",
            type: "operator",
        },
        {
            name: "e",
            symbol: "e",
            formula: "Math.E",
            type: "number",
        },
        {
            name: "acos",
            symbol: "acos",
            formula: "inv_trigo(Math.acos,",
            type: "trigo_function",
        },
        {
            name: "asin",
            symbol: "asin",
            formula: "inv_trigo(Math.asin,",
            type: "trigo_function",
        },
        {
            name: "atan",
            symbol: "atan",
            formula: "inv_trigo(Math.atan,",
            type: "trigo_function",
        },
        {
            name: "4",
            symbol: 4,
            formula: 4,
            type: "number",
        },
        {
            name: "5",
            symbol: 5,
            formula: 5,
            type: "number",
        },
        {
            name: "6",
            symbol: 6,
            formula: 6,
            type: "number",
        },
        {
            name: "multiplication",
            symbol: "×",
            formula: "*",
            type: "operator",
        },
        {
            name: "factorial",
            symbol: "×!",
            formula: FACTORIAL,
            type: "math_function",
        },
        {
            name: "exp",
            symbol: "exp",
            formula: "Math.exp(",
            type: "math_function",
        },
        {
            name: "ln",
            symbol: "ln",
            formula: "Math.log(",
            type: "math_function",
        },
        {
            name: "log",
            symbol: "log",
            formula: "Math.log10(",
            type: "math_function",
        },
        {
            name: "1",
            symbol: 1,
            formula: 1,
            type: "number",
        },
        {
            name: "2",
            symbol: 2,
            formula: 2,
            type: "number",
        },
        {
            name: "3",
            symbol: 3,
            formula: 3,
            type: "number",
        },
        {
            name: "subtraction",
            symbol: "–",
            formula: "-",
            type: "operator",
        },
        {
            name: "power",
            symbol: "x^y",
            formula: POWER,
            type: "math_function",
        },
        {
            name: "ANS",
            symbol: "ANS",
            formula: "ans",
            type: "number",
        },
        {
            name: "percent",
            symbol: "%",
            formula: "/100",
            type: "number",
        },
        {
            name: "comma",
            symbol: ".",
            formula: ".",
            type: "number",
        },
        {
            name: "0",
            symbol: 0,
            formula: 0,
            type: "number",
        },
        {
            name: "calculate",
            symbol: "=",
            formula: "=",
            type: "calculate",
        },
        {
            name: "addition",
            symbol: "+",
            formula: "+",
            type: "operator",
        },
    ];
    const handleButtonClick = (e) => {
        const target = e.target;
        calculator_buttons.forEach(btn => {
            if(target.id === btn.name)
               calculate(btn)
        })
    }

    const initRad = () => {
        const radBtn = document.getElementById("rad");
        radBtn.classList.add("active-angle");
    }

    const angleToggler = () => {
        const radBtn = document.getElementById("rad");
        const degBtn = document.getElementById("deg");
        radBtn.classList.toggle("active-angle");
        degBtn.classList.toggle("active-angle");
    }

    const calculate = (button) => {
        const {name, symbol, formula, type} = button
        if(type === "number" || type === "operator"){
            data.operation.push(symbol);
            data.formula.push(formula);
        }
        else if(type === "trigo_function"){
            data.operation.push(symbol + "(");
            data.formula.push(formula)
        }
        else if(type === "math_function"){
            let newSymbol = symbol;
            let newFormula = formula;
            if(name === "factorial")
                newSymbol = "!";
            else if (name === "power" || "square")
                newSymbol = "^(";
            else
            {
                newSymbol += "(";
                newFormula += "(";
            }
            data.operation.push(newSymbol);
            data.formula.push(newFormula);
            if(name === "square"){
                data.operation.push("2)");
                data.formula.push("2)");
            }
        }
        else if(type === "key"){
            if(name === "clear"){
                data.operation = [];
                data.formula = [];
                updateOutputResult("0");
            }
            else if(name === "delete")
            {
                data.operation.pop();
                data.formula.pop();
            }
            else if(name === "rad")
            {
                RADIAN = true;
                angleToggler();
            }
            else if(name === "deg")
            {
                RADIAN = false;
                angleToggler();
            }
        }
        else if(type === "calculate"){
            let formulaStr = data.formula.join("");
            let result;
            let POWER_SEARCH_RESULT = searchArray(data.formula, POWER);
            let FACTORIAL_SEARCH_RESULT = searchArray(data.formula, FACTORIAL);

            console.log(data.formula)
            const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
            BASES.forEach(base => {
                let toReplace = base + POWER;
                let replacement = "Math.pow(" + base + ",";
                formulaStr = formulaStr.replace(toReplace, replacement);
            })

            const NUMBERS = factorialNumberGetter(data.formula, FACTORIAL_SEARCH_RESULT);
            NUMBERS.forEach(factorial => {
                formulaStr = formulaStr.replace(factorial.toReplace, factorial.replacement);
            })
            try {
                console.log(formulaStr)
                console.log(BASES)
                result = eval(formulaStr);
            }catch(error) {
                if(error instanceof SyntaxError)
                {
                    result = "Syntax Error!";
                    updateOutputResult(result);
                    return;
                }
            }
            console.log(data.operation);
            console.log(data.formula);
            ans = result;
            data.operation = [result];
            data.formula = [result];

            updateOutputResult(result);
        }
        updateOutputOperations(data.operation.join(""));
    }

    const factorialNumberGetter = (formula, FACTORIAL_SEARCH_RESULT) => {
        let numbers = [];
        let factorial_sequence = 0;
        FACTORIAL_SEARCH_RESULT.forEach(factorial_index => {
            let number = [];
            let next_index = factorial_index + 1;
            let next_input = formula[next_index];
            if(next_input === FACTORIAL){
                factorial_sequence += 1;
                return;
            }
            let first_factorial_index = factorial_index - factorial_sequence;
            let previous_index = first_factorial_index - 1;
            let parentheses_count = 0;
            while(previous_index >= 0){
                if(formula[previous_index] === "(") parentheses_count--;
                if(formula[previous_index] === ")") parentheses_count++;
                let isOperator = false;
                OPERATORS.forEach(ope => {
                    if(formula[previous_index] === ope)
                        isOperator = true;
                })
                let isPower = formula[previous_index] === POWER;
                if(isOperator && parentheses_count === 0 || isPower)
                    break;
                number.unshift(formula[previous_index]);
                previous_index--;
            }
            let number_str = number.join('');
            const factorial = "factorial(";
            const close_parenthese = ")";
            let times = factorial_sequence + 1;
            let toReplace = number_str + FACTORIAL.repeat(times);
            let replacement = factorial.repeat(times) + number_str + close_parenthese.repeat(times);
            numbers.push({
                toReplace: toReplace,
                replacement: replacement,
            })
            factorial_sequence = 0;
        })
        return numbers;
    }
    const powerBaseGetter = (formula, POWER_SEARCH_RESULT) => {
        let powers_bases = [];
        POWER_SEARCH_RESULT.forEach(power_index => {
            let base = [];
            let parentheses_count = 0;
            let previous_index = power_index - 1;
            while(previous_index >= 0){
                if(formula[previous_index] === "(") parentheses_count--;
                if(formula[previous_index] === ")") parentheses_count++;
                let isOperator = false;
                OPERATORS.forEach(ope => {
                        if(formula[previous_index] === ope)
                            isOperator = true;
                })
                let isPower = formula[previous_index] === POWER;
                if((isOperator && parentheses_count === 0) || isPower)
                    break;
                base.unshift(formula[previous_index]);
                previous_index--;
            }
            powers_bases.push(base.join(''));
        })
        return powers_bases;
    }
    const searchArray = (arr, keyword) => {
        let search_result = [];
        arr.forEach((element, index) => {
            if(element === keyword)
                search_result.push(index);
        })
        return search_result;
    }
    const updateOutputOperations = (operation) => {
        const outputOperationValue = document.querySelector(".operation .value");
        outputOperationValue.innerHTML = operation;
    }
    const updateOutputResult = (result) => {
        const outputResultValue = document.querySelector(".result .value");
        outputResultValue.innerHTML = result;
    }

    const factorial = (number) => {
        if(number % 1 !== 0)
            return gamma(number);
        if(number === 0 || number === 1) return number;
        let result = 1;
        for(let i = 2; i<=number; ++i)
        {
            result *= i;
            if(result === Infinity)
                return Infinity;
        }
        return result;
    }
    const trigo = (callback, angle) => {
        if(!RADIAN)
        {
            angle = angle * Math.PI / 180;
        }
        return callback(angle)
    }

    const inv_trigo = (callback, value) => {
        let angle = callback(value);
        if(!RADIAN)
        {
            angle = angle * Math.PI / 180;
        }
        return angle;
    }
    function gamma(n) {
        var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
            p = [
                0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                771.32342877765313, -176.61502916214059, 12.507343278686905,
                -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
            ];
        if (n < 0.5) {
            return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
        } else {
            n--;
            var x = p[0];
            for (var i = 1; i < g + 2; i++) {
                x += p[i] / (n + i);
            }
            var t = n + g + 0.5;
            return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
        }
    }
    return (
        <>
            <div className="calculator">
                <div className="calc-container">
                    <div className="mode">Scientific</div>
                    <div className="output">
                        <div className="operation">
                            <div className="value"></div>
                        </div>
                        <div className="result">
                            <div className="value">0</div>
                        </div>
                    </div>
                    <div className="input" onClick={handleButtonClick}>
                        <ButtonsRow row={calculator_buttons.slice(0, 8)}/>
                        <ButtonsRow row={calculator_buttons.slice(8, 16)}/>
                        <ButtonsRow row={calculator_buttons.slice(16, 24)}/>
                        <ButtonsRow row={calculator_buttons.slice(24, 32)}/>
                        <ButtonsRow row={calculator_buttons.slice(32, 39)}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScientificMode;