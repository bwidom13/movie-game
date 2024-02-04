import React, { useRef, useState, useContext } from 'react'
import MovieListGroup from './MovieListGroup';
import axios from 'axios';
import addGuessToLocalStorage from './helperFunctions/AddGuessToLocalStorage';
import { TriggerRender } from './GuessContainer';

export default function SelectMovie( {correctMovieFound, lostGame} ) {
    const [showOptions, setShowOptions] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [pushedKey, setPushedKey] = useState(null);
    const [triggerMovieListGroup, setTriggerMovieListGroup] = useState(false);
    const triggerRender = useContext(TriggerRender);    
    
    const input = useRef();

    function guessMovie(){        
        axios.get("http://localhost:8080/movie-game/guess/" + selectedMovieId).then((movieInfo) => {
            // addGuessToLocalStorage(movieInfo);
            // triggerRender.setTriggerRender(!triggerRender.triggerRender);
            // input.current.value="";
            // setSearchQuery("");
            console.log(movieInfo);
        });
    }
    
    return (
        <>
            {!correctMovieFound && !lostGame &&
                <div>
                    <div className='d-flex align-items-stretch mb-1'>
                        <input className="form-control form-control-lg" type="text" placeholder="Guess" ref={input}
                            onFocus={() => { setShowOptions(true);  }}
                            onBlur={() => setShowOptions(false)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                setPushedKey(e.key);
                                setTriggerMovieListGroup(!triggerMovieListGroup);
                            }}
                        ></input>
                        <button type="button" className="ms-1 btn btn-success"
                        onClick={guessMovie}>Submit</button>
                    </div>
                    {showOptions && <div className="w-75" style={{ height: "200px", position: "fixed", overflow: "auto" }}>
                        <MovieListGroup searchQuery = { searchQuery } 
                        input = {input} 
                        setSearchQuery = { setSearchQuery } 
                        setSelectedMovieId = { setSelectedMovieId } 
                        selectedMovieId = { selectedMovieId }
                        pushedKey = { pushedKey }
                        triggerMovieListGroup = { triggerMovieListGroup }
                        />
                    </div>}            
                </div>
            }
        </>
    )
}
