import './App.css';
import RandomQuoteMachine from './components/RandomQuoteMachine';
import Nav from './components/Nav'
import React,{useState} from 'react';
import Markdown from './components/Markdown';
import Drums from './components/Drums';
import Calculator from './components/Calculator';
import TFPFClock from './components/TFPFClock';

const solutions=['Random Quote Machine',
                'Markdown Previewer',
                'Drum Machine',
                'Javascript Calculator',
                '25+5 clock']
    
function App() {
  const pages=5;
  const [currPage,setCurrPage]=useState(0);
  const handleNextSolution=function(){
    const nextpage=(currPage+1)%pages;
    setCurrPage(nextpage);
  }

  return (
    <div className="App">
        <Nav handleNextSolution={handleNextSolution} solution={solutions[currPage]}></Nav>
        {currPage===1?<RandomQuoteMachine/>:<></>}
        {currPage===2?<Drums/>:<></>}
        {currPage===0?<TFPFClock/>:<></>}
        {currPage===3?<Markdown/>:<></>}
        {currPage===4?<Calculator/>:<></>}
    </div>
  );
}

export default App;
