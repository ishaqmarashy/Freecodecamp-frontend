import React,{useState,useEffect} from 'react'
import quotesData from './quotesData'

function Random_Quote_Machine(){
    const [selectedQuote,setSelectedQuote]=useState([]);
    const getRandomIndex=function(){return Math.floor(Math.random() * quotesData.length)};
    
    useEffect(() => {
        setSelectedQuote(quotesData[getRandomIndex()]);
      }, [quotesData]);

    const handleNextQuote=()=>{
        setSelectedQuote(quotesData[getRandomIndex()])
    }

    return(<>
    <h3 className='quote-title'>{selectedQuote.title}<a> {selectedQuote.author}</a></h3>
    <div className='quote-text'>
        "{selectedQuote.quote}"
    </div>
    <div className='quote-footer'>
        <button className='quote-next-button' onClick={handleNextQuote}>Next Quote</button>
    </div>
    </>)
}
export default Random_Quote_Machine