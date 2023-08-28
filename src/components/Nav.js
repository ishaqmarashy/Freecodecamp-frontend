import React from "react";

function Nav({handleNextSolution, solution}){
    return(
    <div className='nav'> 
        <div>{solution}</div>
            <button onClick={handleNextSolution} id="new-quote">Next Solution</button>
        </div>)
}
export default Nav;