
import React, { useEffect, useState } from 'react'
import CastHint from './hints/CastHint'
import {FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

export default function Guess({ guessInfo, correctMovieFound }) {
    const [viewportWidth, setViewportWidth] = useState(window.visualViewport.width);
    const [width, setWidth] = useState("");
    window.onresize = ()=>{setViewportWidth(window.visualViewport.width)} 
    useEffect(()=>{
        if(viewportWidth > 720){
            setWidth("15%");
        }else{
            setWidth("");
        }        
    },[viewportWidth, guessInfo])
    return (
        <div>
            {(!correctMovieFound || guessInfo.guessTitle !== "") &&
                <div className='d-flex justify-content-start rounded mb-1 p-1 guess' style={{ minHeight: "40px", backgroundColor: "#EEEEEE", overflow: "auto" }}>
                    {guessInfo.guessTitle.length > 0 && 
                    <div className='d-flex align-items-center rounded p-1 flex-fill justify-content-center guess-hint text-wrap text-center fw-bold fst-italic' style={{backgroundColor:'#CCCCCC', maxWidth:width}}>                        
                            {guessInfo.guessTitle}                
                    </div>}
                    {guessInfo.similarities.yearDifference !== null && !guessInfo.correct &&
                        <div className='d-flex align-items-center ms-1 rounded p-1 flex-fill justify-content-center guess-hint' style={{backgroundColor:'#CCCCCC'}}>
                        {Number.parseInt(guessInfo.similarities.yearDifference) === 0 && <div>Same Year</div>}
                        {Number.parseInt(guessInfo.similarities.yearDifference) !== 0 &&
                        (Number.parseInt(guessInfo.similarities.yearDifference) > 0 ?                         
                        <FaPlusCircle className='me-1' style={{color:"olive"}}/> : <FaMinusCircle className='me-1' style={{color:"olive"}}/>)} 
                        {Number.parseInt(guessInfo.similarities.yearDifference) !== 0 && Math.abs(Number.parseInt(guessInfo.similarities.yearDifference))}
                        {Number.parseInt(guessInfo.similarities.yearDifference) !== 0 && <div>&nbsp;years</div>}
                    </div>}
                    {guessInfo.similarities.commonGenres.length > 0 &&
                    <div className='d-flex align-items-center ms-1 rounded p-1 flex-fill justify-content-center guess-hint' style={{backgroundColor:'#CCCCCC'}}>
                        <div className='d-flex flex-column text-center'>
                            <div>
                                {!guessInfo.correct && <span>
                                    Common 
                                </span>} Genres: 
                            </div>
                            {guessInfo.similarities.commonGenres.map((g) => {
                                return (
                                <span className="badge bg-success m-1 hint-badge" key = {g.id}>
                                    {g.name}
                                </span>)
                            })}
                        </div>
                    </div>}
                    {guessInfo.similarities.commonCastMembers.length > 0 &&
                        <div className='d-flex flex-column align-items-center justify-content-center ms-1 p-0 w-25 rounded flex-fill guess-hint' style={{backgroundColor:'#CCCCCC'}}>
                            <div>
                                {!guessInfo.correct ? <span>
                                Common
                                </span> : <span>Top</span>} Cast:
                            </div>                            
                            {guessInfo.similarities.commonCastMembers.map((c) => {
                                return (<CastHint cast = {c} key = {c.id}/>)
                            })} 
                    </div>}
                    {guessInfo.similarities.commonKeyWords.length > 0 &&
                        <div className='d-flex align-items-center ms-1 rounded p-1 flex-fill justify-content-center guess-hint' style={{backgroundColor:'#CCCCCC'}}>
                        <div className='d-flex flex-column text-center'>
                            <div>
                                {!guessInfo.correct && <span>
                                Common
                                </span>} Key Words: 
                            </div>
                            {guessInfo.similarities.commonKeyWords.map((kw) => {
                                return (<span className="badge bg-success m-1 hint-badge" key = {kw.id}>
                                    {kw.name}
                                </span>)
                            })}
                        </div>
                    </div>}
                </div>
            }
        </div>
    )
}
