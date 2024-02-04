import React, { useEffect, useState } from 'react'

export default function HintContainer({keyWordHint1, keyWordHint2, taglineHint, correctMovieFound}) {  
  const [viewportWidth, setViewportWidth] = useState(window.visualViewport.width);
  const [columnAttribute, setColumnAttribute] = useState("");
  window.onresize = ()=>{setViewportWidth(window.visualViewport.width)} 
  useEffect(()=>{
      if(viewportWidth > 900){
        setColumnAttribute("");
      }else{
        setColumnAttribute("flex-column");
      }        
  },[viewportWidth])
  return (
    <>
      {!correctMovieFound &&
        <div className='border border-secondary rounded text-center h-15 p-2 fw-bold'>
            Hints
            <div className={`d-flex mb-2 p-1 align-items-center ${columnAttribute}`}>
                <div className='flex-fill'>
                    Bonus Key Word 1: 
                    <br/>
                    {keyWordHint1 === null ? 
                    <div className='badge bg-secondary'>Will be revealed on third guess</div> : <span className='badge bg-success'>{keyWordHint1}</span>}
                </div>
                <div className='flex-fill'>
                    Bonus Key Word 2: 
                    <br/>
                    {keyWordHint2 === null ? 
                    <div className='badge bg-secondary'>Will be revealed on fourth guess</div> : <span className='badge bg-success'>{keyWordHint2}</span>}
                </div>
                <div className='flex-fill'>
                    Movie Tagline: 
                    <br/>
                    {taglineHint === null ?
                    <div className='badge bg-secondary'>Will be revealed on fifth guess</div> : <span className='text-wrap badge bg-success'>{taglineHint}</span>}
                </div>
            </div>
        </div>
      }
    </>
  )
}
