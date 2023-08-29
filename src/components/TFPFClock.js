import React, { useState, useEffect ,useRef } from "react";

function TFPFClock(){
    const [breakLength,setBreakLength]=useState(5);
    const [sessionLength,setSessionLength]=useState(25);
    const [sessionTime,setSessionTime]=useState(sessionLength*60*1000);
    const [start,setStart]=useState(false);
    const [continueBreak,setContinueBreak]=useState(false);
    const intervalRef = useRef();
    const minute=Math.floor(sessionTime / 60000);
    const second=Math.floor((sessionTime % 60000) / 1000);
    const sessionTimer=<>{minute<10?"0"+minute:minute}:{second<10?"0"+second:second}</>;

    const togglePause=()=>{
        setStart(!start);
       
    }
    const pause_play_button=<button id='start_stop' onClick={togglePause}>{start?"STOP":"START"}</button>
    

    const stop =()=>{
        setStart(false);
        clearInterval(intervalRef.current);
        const audioElement= document.getElementById('beep');
        audioElement.pause();
        audioElement.currentTime = 0;          
    }
    const handleBreakIncrement = () => {
        if (breakLength < 60 && !start) {
            setBreakLength(prevBreakLength => prevBreakLength + 1);
        }
    };

    const handleBreakDecrement = () => {
        if (breakLength > 1 && !start) {
            setBreakLength(prevBreakLength => prevBreakLength - 1);
        }
    };

    const handleSessionIncrement = () => {
        if (sessionLength < 60 && !start) {
            setSessionLength(prevSessionLength => prevSessionLength + 1);
            setSessionTime(sessionLength*60*1000);
        }
    };

    const handleSessionDecrement = () => {
        if (sessionLength > 1 && !start) {
            setSessionLength(prevSessionLength => prevSessionLength - 1);
            setSessionTime(sessionLength*60*1000);
        }
    };

    const resetNow=()=>{
        clearInterval(intervalRef.current);
        stop();
        setContinueBreak(false);
        setSessionLength(25);
        setBreakLength(5);
    }
    useEffect(()=>{
        setSessionTime(sessionLength*60*1000);
    },[sessionLength]);


    useEffect(() => {
        if (start) {
            
            intervalRef.current = setInterval(() => {
              setSessionTime(prevSessionTime => prevSessionTime - 1000);
            }, 1000);
            if(sessionTime<0){
                setContinueBreak(contBreak=>!contBreak);
                setSessionTime(!continueBreak?sessionLength*60*1000:breakLength*60*1000);
                const audioElement = document.getElementById('beep');
                audioElement.currentTime = 0;
                audioElement.play();
            }
        }
       
        return () => clearInterval(intervalRef.current);
      }, [start, sessionTime, continueBreak,breakLength,sessionLength]);

 return(
 <div className="clock-header">
    <div id="timer">
        <div id="timer-label">
            {!continueBreak?(start?'Started':'Paused'):'Break'}
            <div id="time-left">
                {sessionTimer}
            </div>
        </div>
        <label id="break-label" >
            <div  id="break-length">
                {breakLength}
            </div>
        </label>
        <div className="break-container">
            <button id="break-increment" onClick={handleBreakIncrement}>
                    Break+ 
            </button>
            <button id="break-decrement" onClick={handleBreakDecrement}>
                    Break-
            </button>
        </div>
        <label id="session-label" >
          <div id="session-length">
            {sessionLength}
          </div>
        </label>
        <div className="break-container">
        <button id="session-increment" onClick={handleSessionIncrement}>
                Session+
        </button>
        <button id="session-decrement" onClick={handleSessionDecrement}>
                Session-
        </button>
        </div>
        <div className="break-container">
            {pause_play_button}
            <button id='reset' onClick={resetNow}> 
                RESET
            </button>
        </div>
        <audio src="./mp3/Alarm.wav" id="beep" ></audio>
    </div>
 </div>
 )
} 

export default TFPFClock;