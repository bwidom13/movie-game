import React from 'react'

export default function RulesModal({setShowRules}) {
  return (
    <div className="w-50 rounded shadow" style={{position:"absolute", top:"50px", backgroundColor:"#006633"}}>
        <div className='d-flex flex-column justify-content-center rounded m-0 p-0 g-0' >
            <div className='d-flex w-100 align-self-start justify-content-end'>
                <button type="button" class="btn-close" aria-label="Close" onClick={()=>{setShowRules(false)}}></button>
            </div>
            <div className='d-flex justify-content-center text-white'>
                <ol>
                    <li>Guess any movie.</li>
                    <li>
                        The game will list similarities between your guess and the correct movie in one of the rows. 
                        Possible similarities include:
                        <ul>
                            <li>Common Cast</li>
                            <li>Common Genres</li>
                            <li>Common Key Words</li>
                        </ul>
                        If the game doesn't find any similarities for a category, the category won't
                        show up in the row. The game will also tell you how far apart the release years are between
                        your guess and the correct movie. +5 years means the correct movie was made 5 years after your guess.
                        -5 years means it was made 5 years before.                        
                    </li>
                    <li>
                        Continue guessing movies to get as much information about the correct movie as possible.
                        Use the similarities and hints to try to guess the correct movie within 6 tries.
                    </li>
                </ol>
            </div>
        </div>
    </div>
  )
}
