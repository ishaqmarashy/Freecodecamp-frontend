import './App.css';
import RandomQuoteMachine from './components/RandomQuoteMachine';
import Nav from './components/Nav'
import React,{useState} from 'react';
import solutions from './components/solutions'
import Markdown from './components/Markdown';

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
        {currPage===0?<Markdown/>:<></>}
        {currPage===2?<Markdown/>:<></>}
        {currPage===3?<Markdown/>:<></>}
        {currPage===4?<Markdown/>:<></>}
    </div>
  );
}

export default App;
