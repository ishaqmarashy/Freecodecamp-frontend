import React, { useState, useEffect} from "react";
import { evaluate } from "mathjs";

const Calculator = () => {
    const [expressionString, setExpressionString] = useState('0');
    const [expectDecimal, setExpectDecimal] = useState(true);
    const idNames = {'seven': '7', 'eight': '8', 'nine': '9', 'divide': "/", 'four': '4',
        'five': '5', 'six': '6', 'multiply': "*", 'one': '1', 'two': '2',
        'three': '3', 'subtract': "-", 'zero': '0', 'decimal': ".",
        'add': "+", 'equals': "=", 'clear': "clear"};
    const nonNumericItems = ['/', '*', '-', '+', '.'];
    const dups ={'equals': "Enter",'clear': "Backspace"};

    const findKeyByValue = (dictionary,targetValue) => {
        return Object.keys(dictionary).find(key => dictionary[key] === targetValue.toString());
    };

    const handleInput = (input)=> {
        const key = input.key ? (findKeyByValue(idNames, input.key) || findKeyByValue(dups, input.key)) : input;
        if ((!key)||((expressionString==='0')&& (idNames[key]==='0'))){
            return;
        }if (nonNumericItems.some(has => idNames[key]===has)&&key!=='decimal'){
            setExpectDecimal(true)
        }if(key==='clear'){
            setExpressionString('0');
        }else if(key==='equals'){
            try{setExpressionString(evaluate(expressionString).toString());}
            catch{setExpressionString('Error');}
        }else if(((expressionString==='0')&&(key!=='zero'))||(expressionString==='Error')){
            setExpressionString(idNames[key])
        }else if(nonNumericItems.some(ends => expressionString.endsWith(ends)) 
                && nonNumericItems.some(has => idNames[key]===has)){
            setExpressionString(expressionString.substring(0,expressionString.length-1)+idNames[key])
        }else{
            if(!expectDecimal&&key==='decimal')
                return;
            else if (key==='decimal')
                setExpectDecimal(false);
            setExpressionString(expressionString+idNames[key])
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleInput);
        return () => {
            window.removeEventListener("keydown", handleInput);
        };
    });

    return (
        <header className="calculator-header">
            <div id='calculator'>
                <div id='display' className="calc-display">
                    {expressionString}
                </div>
                <div id='pad'>
                    {Object.entries(idNames).map(([key, value]) => (
                        <div id={key} className="calculater-pad" key={key} onClick={() => handleInput(key)}>
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Calculator;
