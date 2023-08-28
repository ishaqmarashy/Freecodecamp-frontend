import React, {useState,useEffect} from "react";
import { evaluate } from "mathjs";

const findKeyByValue = (dictionary, targetValue) => {
    for (const key in dictionary) {
        if (dictionary[key] === targetValue.toString()) {
            return key;
        }
    }
    return; 
};
function Calculator(){
    const [expressionString,setExpressionString]=useState('0');
    const [replace,setReplace]=useState(true);
    const idNames = {
        'seven': '7',
        'eight': '8',
        'nine': '9',
        'divide': "/",
        'four': '4',
        'five': '5',
        'six': '6',
        'multiply': "*",
        'one': '1',
        'two': '2',
        'three': '3',
        'subtract': "-",
        'zero': '0',
        'decimal': ".",
        'add': "+",
        'equal': "=",
        'clear': "clear",
        'equal': "Enter",
        'clear': "Backspace"
      };

      const handleInput = (input) => {
        var key =input;
        if(input.key){
            const foundkey=findKeyByValue(idNames,key.key);
            key= foundkey;
        }
        if(!key){
            return;
        }
        if(replace && key !== 'clear' && key !== 'equal'){
            setExpressionString(idNames[key]);
            setReplace(false);
        }
        else try {
            if (key !== 'clear' && key !== 'equal')
                setExpressionString(expressionString + idNames[key]);
            else if (key === 'equal') {
                const result = evaluate('0+'+expressionString+'+0');
                setExpressionString(result);
                } 
            else setExpressionString('0');
        } catch (error) {
            setExpressionString('Error');
            setReplace(true)
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleInput);

        return () => {
            window.removeEventListener("keydown", handleInput);
        };
    }, [expressionString, replace]);


    return(<header className="calculator-header">
            <div id='calculator'>
                <div id='display' className="calculater-display">        
                    {expressionString}
                </div>
                <div id='pad'>
                    {Object.keys(idNames).map(key => (
                        <div className="calculater-pad" key={key} onClick={() => handleInput(key)}>
                        {idNames[key]}                       
                        </div>
                    ))}
                    </div>
            </div>
        </header>);
};
export default Calculator;
