import React, { useEffect, useRef, useState } from 'react'
import ListItem from './ListItem';
import axios from 'axios';
import getTodaysGuessesAsObject from '../helperFunctions/GetTodaysGuessesAsObject';
import axiosInstance from '../helperFunctions/axiosHelper';

//@param data: Array of data.
export default function SearchSelector({ data, submitCallback, correctMovieFound, lostGame, setShowMessage, setMessage, mySetTimeout }) {
    const [filteredData, setFilteredData] = useState(data);
    const [index, setIndex] = useState(-1);
    const [showOptions, setShowOptions] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(-1);
    const [changeInputValue, setChangeInputValue] = useState(false);
    const input = useRef();

    function submit(id = selectedMovieId) {
        if(id!==-1){
            submitCallback(id);
            setSearchQuery("");
            setIndex(-1);
            input.current.value = "";
            setSelectedName("");
            setFilteredData(data);
            setShowOptions(false);
        }
    }

    function getIdOfMovie(name) {
        let id = -1;
        
        data.forEach((movie) => {
            if (movie.name.toLowerCase() === name.toLowerCase()) {
                id = movie.id;
            }
        });
        
        if(id === -1 && data.length !== 0){
            setMessage("Movie Not Found");
            setShowMessage(true);
            mySetTimeout(setTimeout(()=>{setShowMessage(false)}, 5000));
        }
        return id;        
    }

    useEffect(() => {
        setFilteredData(data.filter((item) => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }));
        if (changeInputValue && index !== filteredData.length && index !== -1) {
            input.current.value = selectedName;
        }
    }, [index, searchQuery, selectedName, showOptions]);

    return (
        <div className="m-2">
            {(!correctMovieFound && !lostGame) && <div className='d-flex'>
                <input className="form-control" type="text" placeholder="Search" ref={input}
                    onFocus={() => { setShowOptions(true); }}
                    onBlur={() => {
                        setShowOptions(false);
                        setIndex(-1);
                        input.current.value = searchQuery;
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (showOptions === false) {
                                submit();
                            }
                            if(index === -1){
                                setSelectedMovieId(getIdOfMovie(searchQuery));
                            }
                            setShowOptions(false);
                            setSearchQuery(input.current.value);
                        }
                        if (showOptions) {
                            setChangeInputValue(true);
                            if (filteredData.length !== 0 && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                                if (document.getElementById("item" + index) !== null) {
                                    document.getElementById("item" + index).scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
                                } else if (e.key === "ArrowDown") {
                                    document.getElementById("item0").scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
                                } else {
                                    document.getElementById("item" + (filteredData.length - 1)).scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
                                }
                            }
                            if (e.key === "ArrowDown") {
                                setIndex(index + 1);
                                if (index === filteredData.length - 1) {
                                    input.current.value = searchQuery;
                                }
                                else if (index === filteredData.length) {
                                    setIndex(0);
                                }
                            } else if (e.key === "ArrowUp") {
                                e.preventDefault();
                                setIndex(index - 1);
                                if (index === 0) {
                                    input.current.value = searchQuery;
                                    input.current.selectionStart = input.current.selectionEnd = input.current.value.length;
                                } else if (index === -1) {
                                    setIndex(filteredData.length - 1);
                                }
                            }
                        }
                    }}
                    onChange={(e) => {
                        setShowOptions(true);
                        setChangeInputValue(false);                        
                        setSearchQuery(e.target.value);
                        setIndex(-1);
                        if (document.getElementById("item0") !== null) {
                            document.getElementById("item0").scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
                        }
                    }} />
                <button type="button" className="btn btn-success ms-1"
                    onClick={() => {
                        if(data.length === 0){
                            setTimeout(()=>{},5000);
                        }
                        axiosInstance.post("/random-movie", getTodaysGuessesAsObject()).then((res) => {
                            input.current.value = res.data.guessTitle;
                            setSearchQuery(res.data.guessTitle);
                            
                            input.current.focus();
                            setShowOptions(false);
                            
                            
                            let i = getIdOfMovie(res.data.guessTitle); 
                                                    
                            setSelectedMovieId(i);
                        });
                        
                    }}>Random</button>
                <button type="button" className="btn btn-success ms-1"
                    onClick={() => {
                        setSearchQuery(input.current.value);                        
                        submit(getIdOfMovie(input.current.value));
                    }}>Submit</button>
            </div>
            }
            {showOptions &&
                <div>

                    <ul className="list-group w-100 overflow-auto" style={{ maxHeight: "30vh", position: "absolute", left: "0px" }}>
                        {filteredData.map((item, i) => {
                            return (
                                <ListItem key={item.id}
                                    item={item}
                                    i={i}
                                    index={index}
                                    setIndex={setIndex}
                                    input={input}
                                    setSearchQuery={setSearchQuery}
                                    setSelectedName={setSelectedName}
                                    setSelectedMovieId={setSelectedMovieId}
                                    setChangeInputValue={setChangeInputValue}
                                    setShowOptions={setShowOptions}
                                    selectedName={selectedName}
                                />
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}
