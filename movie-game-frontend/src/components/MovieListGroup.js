import React, { useEffect, useState } from 'react'
import ListGroupItem from './ListGroupItem'
import axios from 'axios';

export default function MovieListGroup({ searchQuery, setSearchQuery, input, triggerMovieListGroup, setSelectedMovieId, pushedKey, selectedMovieId }) {
    const [movies, setMovies] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(1);

    useEffect(()=>{
        axios.get(`http://localhost:8080/movie-game/movie-titles?like=${searchQuery}`).then(
            (res) => {                
                setMovies(res.data);                
            }
        );
        // changeSelectedMovie();
        if(pushedKey === "ArrowDown"){
            setSelectedIndex(selectedIndex + 1);
        }else if(pushedKey === "ArrowUp"){
            setSelectedIndex(selectedIndex - 1);
        }
        if(movies.length !== 0){
            setSelectedMovieId(movies[selectedIndex].id);
        }
        
    },[searchQuery, triggerMovieListGroup]);

    function changeSelectedMovie(){
        if(pushedKey === "ArrowDown"){
            setSelectedIndex(selectedIndex + 1);
        }else if(pushedKey === "ArrowUp"){
            setSelectedIndex(selectedIndex - 1);
        }
        if(movies.length !== 0){
            setSelectedMovieId(movies[selectedIndex].id);
        }
    }
    

    return (
        <div>
            <ul className="list-group rounded">
                {movies.map((m) => {
                    return (<ListGroupItem movieTitle={ m.name } 
                        key={ m.id } 
                        id={ m.id } 
                        input={ input } 
                        setSearchQuery={ setSearchQuery }
                        setSelectedMovieId = { setSelectedMovieId }
                        selectedMovieId = { selectedMovieId }
                        />)
                })}
            </ul>
        </div>
    )
}
