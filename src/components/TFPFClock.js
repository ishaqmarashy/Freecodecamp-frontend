import React, { useState, useEffect } from "react";

function TFPFClock(){
    const [breakLenght,setBreakLength]=useState(5);
    const [sessionLength,setSessionLength]=useState(25);
    const [sessionTime,setSessionTime]=useState(25*60*1000);
    const [breakTime,setBreakTime]=useState(5*60*1000);
    const [start,setStart]=useState(false);
    const [continueBreak,setContinueBreak]=useState(true);

    const togglePause=()=>{
        setStart(!start);
        if(!start&&!continueBreak&&sessionTime===0){
            handleReset();
        }
    }
    const pause_play_button=<button id='start_stop' onClick={togglePause}>{start?"STOP":"START"}</button>
    const minute=Math.floor(sessionTime / 60000);
    const second=Math.floor((sessionTime % 60000) / 1000);
    const sessionTimer= <>{minute<10?"0"+minute:minute}
                         :{second<10?"0"+second:second}</>;

    const handleBreakIncrement=()=>{
        if (breakLenght<60)
            setBreakLength(breakLenght+1);
    };
    const handleBreakDecrement=()=>{
        if (breakLenght>1)
            setBreakLength(breakLenght-1);
    };
    const handleSessionIncrement=()=>{
        if (sessionLength<60)
            setSessionLength(sessionLength+1);
    };
    const handleSessionDecrement=()=>{
        if (sessionLength>1)
            setSessionLength(sessionLength-1);
    };
    const handleReset=()=>{
        setStart(false);
        setSessionTime(sessionLength*60*1000);
        setBreakTime(breakLenght*60*1000);
        setSessionLength(25);
        setBreakLength(5);
        setContinueBreak(true);
        document.getElementById('beep').currentTime = 0;
    }

    useEffect(() => {
        let interval;
    
        if (start && sessionTime > 0) {
          interval = setInterval(setSessionTime(sessionTime-1), 1000);
        }
        else if(sessionTime===0&&start) {
            const audioElement = document.getElementById('beep');
            audioElement.currentTime = 0;
            audioElement.play();
            if (continueBreak){
                setContinueBreak(false);
                interval = setInterval(setSessionTime(breakTime-1), 1000);
            }
        }
        else {

        }
    
        return () => clearInterval(interval);
      }, [start, sessionTime]);

 return(
 <div className="clock-header">
    <div id="timer">
        <div id="timer-label">
            {continueBreak?'Work!':'Take a Break'}
        </div>
        <label id="break-label" >
            <div  id="break-length">
                {breakLenght}
            </div>
        </label>
        <div className="break-container">
            <button id="break-increment" onClick={handleBreakIncrement}>
                    break-increment
            </button>
            <button id="break-decrement" onClick={handleBreakDecrement}>
                    break-decrement
            </button>
        </div>
        <label id="session-label" >
          <div id="session-length">
            {sessionLength}
          </div>
        </label>
        <div className="break-container">
        <button id="session-increment" onClick={handleSessionIncrement}>
                session-increment
        </button>
        <button id="session-decrement" onClick={handleSessionDecrement}>
                session-decrement
        </button>
        </div>
        <div id="time-left">
            {sessionTimer}
        </div>
        <div className="break-container">
            {pause_play_button}
            <button id='reset' onClick={handleReset}> 
                RESET
            </button>
        </div>
        <audio src="./mp3/Kick_n_Hat.mp3" id="beep" ></audio>
    </div>
 </div>
 )
} 

export default TFPFClock;