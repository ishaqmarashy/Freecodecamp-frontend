import React,{useState,useEffect} from 'react'

const quotesData=[
    {quote: "The only source of knowledge is experience.",
    author: "Albert Einstein"}
    ,
    {quote: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci"}
    ,
    {quote: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King"}
    ,
    {quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"}
    ,
    {quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"}
    ,
    {quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"}
    ,
    {quote: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin"}
    ,
    {quote: "Education is not preparation for life; education is life itself.",
    author: "John Dewey"}
    ,
    {quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"}
    ,
    {quote: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "William Butler Yeats"}];

function RandomQuoteMachine(){
    const [selectedQuote,setSelectedQuote]=useState([]);
    const getRandomIndex=function(){return Math.floor(Math.random() * quotesData.length)};
    
    useEffect(() => {
        setSelectedQuote(quotesData[getRandomIndex()]);
      }, []);

    const handleNextQuote=function(){
        setSelectedQuote(quotesData[getRandomIndex()])
    };

    return(
    <header className="quote-header">
        <div id='quote-box'>
            <h3 id='author'>{selectedQuote.title}{selectedQuote.author}</h3>
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