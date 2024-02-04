import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TriggerRender } from './GuessContainer';
import addGuessToLocalStorage from './helperFunctions/AddGuessToLocalStorage';

export default function ListGroupItem({ movieTitle, id, input, setSearchQuery, setSelectedMovieId, selectedMovieId }) {
    const [background, setBackground] = useState("");
    useEffect(()=>{
        if(id === selectedMovieId){
            setBackground("bg-danger");
        }else{
            setBackground("");
        }
    },[selectedMovieId])  
    
    function guessMovie(){
        input.current.value = movieTitle;
        setSearchQuery("");
        setSelectedMovieId(id);
    }
    return (
        <div >
            <li className={`list-group-item rounded ${background}`} style={{ cursor: "pointer" }} onPointerDown={guessMovie}
            >{movieTitle}</li>
        </div>
    )
}
