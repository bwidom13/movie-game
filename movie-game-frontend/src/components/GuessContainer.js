import React, { createContext, useEffect, useState } from 'react'
import Guess from './Guess'
import HintContainer from './hints/HintContainer';
import getTodaysGuessesAsObject from './helperFunctions/GetTodaysGuessesAsObject';
import WinMessageContainer from './messages/WinMessageContainer';
import LostMessageContainer from './messages/LostMessageContainer';
import SearchSelector from './searchSelector/SearchSelector';
import addGuessToLocalStorage from './helperFunctions/AddGuessToLocalStorage';
import Message from './messages/Message';
import axiosInstance from './helperFunctions/axiosHelper';
import addHint1ToLocalStorage from './helperFunctions/AddHint1ToLocalStorage';
import getHint1FromLocalStorage from './helperFunctions/GetHint1FromLocalStorage';


const TriggerRender = createContext();

function GuessContainer({ data }) {
    const dummy = {
        guessTitle: "",
        similarities: {
            yearDifference: null,
            commonGenres: [],
            commonCastMembers: [],
            commonKeyWords: []
        }
    };
    const [guessInfo1, setGuessInfo1] = useState(dummy);
    const [guessInfo2, setGuessInfo2] = useState(dummy);
    const [guessInfo3, setGuessInfo3] = useState(dummy);
    const [guessInfo4, setGuessInfo4] = useState(dummy);
    const [guessInfo5, setGuessInfo5] = useState(dummy);
    const [guessInfo6, setGuessInfo6] = useState(dummy);
    const [keyWordHint1, setKeyWordHint1] = useState({ id: -1, name: null });
    const [keyWordHint2, setKeyWordHint2] = useState({ id: -1, name: null });
    const [taglineHint, setTaglineHint] = useState(null);
    const [correctMovieFound, setCorrectMovieFound] = useState(false);
    const [triggerRender, setTriggerRender] = useState(false);
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [lostGame, setLostGame] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [timeout, mySetTimeout] = useState(null);
    const [message, setMessage] = useState("");


    const guessSetters = [setGuessInfo1,
        setGuessInfo2,
        setGuessInfo3,
        setGuessInfo4,
        setGuessInfo5,
        setGuessInfo6
    ];


    function guessMovie(selectedMovieId) {
        axiosInstance.get("/guess/" + selectedMovieId).then((movieInfo) => {
            try{
                addGuessToLocalStorage(movieInfo);
            }catch(err){
                setShowMessage(true);
                setMessage(err);
                mySetTimeout(setTimeout(()=>{setShowMessage(false)}, 5000));
            }
            setTriggerRender(!triggerRender);
        });
    }

    useEffect(() => {
        if (window.localStorage.getItem("guesses") === null) {
            let d = new Date().toLocaleDateString();
            let obj = {};
            obj[d] = [];
            let json = JSON.stringify(obj);
            window.localStorage.setItem("guesses",
                json
            );
        }

        if (window.localStorage.getItem("hints") === null) {
            let d = new Date().toLocaleDateString();
            let obj = {};
            obj[d] = {"keyWord1":null, "keyWord2":null, "tagline":null};
            let json = JSON.stringify(obj);
            window.localStorage.setItem("hints",
                json
            );
        }

        let todayGuesses = getTodaysGuessesAsObject();

        if (todayGuesses.length === 0) {
            setCorrectMovieFound(false);
        }

        
        for (let i = 0; i < todayGuesses.length; i++) {
            guessSetters[i](todayGuesses[i]);
            if (!correctMovieFound) {
                if (i === 2 && keyWordHint1.id === -1) {
                    let knownKeyWords = [];
                    for (let guess of todayGuesses) {
                        for (let kw of guess.similarities.commonKeyWords) {
                            knownKeyWords.push(kw);
                        }
                    }
                    axiosInstance.post("/keyWordHint",
                        knownKeyWords
                    ).then((res) => {
                        setKeyWordHint1(res.data);
                        addHint1ToLocalStorage(res.data);
                    })
                }
            
                if (i === 3 && keyWordHint2.id === -1) {
                    let knownKeyWords = [getHint1FromLocalStorage()];
                    console.log(knownKeyWords);
                    for (let guess of todayGuesses) {
                        for (let kw of guess.similarities.commonKeyWords) {
                            knownKeyWords.push(kw);
                        }
                    }
                    axiosInstance.post("/keyWordHint",
                        knownKeyWords
                    ).then((res) => {
                        setKeyWordHint2(res.data);
                    })
                }

                if (i === 4) {
                    axiosInstance.get("/taglineHint").then((res) => {
                        setTaglineHint(res.data);
                    })
                }

                if (todayGuesses[i].correct) {
                    setCorrectMovieFound(true);
                    setNumberOfGuesses(i + 1);
                } else if (i === 5) {
                    setLostGame(true);
                }
            }
        }
    }, [triggerRender])

    return (
        <div className="d-flex flex-column w-75" style={{ height: "90vh", position: "absolute", top: "50px" }}>
            <SearchSelector data={data} 
            submitCallback={guessMovie} 
            correctMovieFound={correctMovieFound} 
            lostGame={lostGame} 
            setShowMessage={setShowMessage}
            setMessage={setMessage}
            mySetTimeout={mySetTimeout}/>
            <div style={{ overflow: "auto", overflowX: "auto" }}>
                <Guess guessInfo={guessInfo1} correctMovieFound={correctMovieFound} lostGame={lostGame} />
                <Guess guessInfo={guessInfo2} correctMovieFound={correctMovieFound} lostGame={lostGame} />
                <Guess guessInfo={guessInfo3} correctMovieFound={correctMovieFound} lostGame={lostGame} />
                <Guess guessInfo={guessInfo4} correctMovieFound={correctMovieFound} lostGame={lostGame} />
                <Guess guessInfo={guessInfo5} correctMovieFound={correctMovieFound} lostGame={lostGame} />
                <Guess guessInfo={guessInfo6} correctMovieFound={correctMovieFound} lostGame={lostGame} />
            </div>
            <HintContainer keyWordHint1={keyWordHint1.name} keyWordHint2={keyWordHint2.name} taglineHint={taglineHint} correctMovieFound={correctMovieFound} lostGame={lostGame} />
            {correctMovieFound && <WinMessageContainer numberOfGuesses={numberOfGuesses} />}
            {lostGame && <LostMessageContainer />}
            {showMessage && <Message 
            setShowMessage={setShowMessage}
            message = {message}
            callback={() => {clearTimeout(timeout);}}/>}
        </div>
    )
}

export { GuessContainer, TriggerRender };
