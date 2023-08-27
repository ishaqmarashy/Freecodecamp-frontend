import React,{useState,useEffect} from 'react'
import quotesData from './quotesData'

function RandomQuoteMachine(){
    const [selectedQuote,setSelectedQuote]=useState([]);
    const getRandomIndex=function(){return Math.floor(Math.random() * quotesData.length)};
    
    useEffect(() => {
        setSelectedQuote(quotesData[getRandomIndex()]);
      }, []);

    const handleNextQuote=()=>{
        setSelectedQuote(quotesData[getRandomIndex()])
    }

    return(
    <header className="quote-header">
        <div id='quote-box'>
            <h3 id='author'>{selectedQuote.title}<a> {selectedQuote.author}</a></h3>
            <div id='text'>
                "{selectedQuote.quote}"
            </div>
            <div className='quote-footer'>
                    <a target="_blank" rel='noopener noreferrer' id='tweet-quote' href={ selectedQuote.author?
                    'https://twitter.com/intent/tweet?text="'+encodeURIComponent(selectedQuote.quote+'" - '+selectedQuote.author)+"&hashtags=quotes"
                    :"''"
                    }>Tweet Quote</a>
                <button id='new-quote' onClick={handleNextQuote}>Next Quote</button>
            </div>
        </div>
    </header>
    )
}
export default RandomQuoteMachine