export default function addGuessToLocalStorage(movieInfo){
    let d = new Date().toLocaleDateString();
    let jsonGuesses = window.localStorage.getItem("guesses");
    let objGuesses = JSON.parse(jsonGuesses);
    
    for(let i = 0; i < objGuesses[d].length; i++){
        if(objGuesses[d][i].guessTitle === movieInfo.data.guessTitle){            
            throw "Movie Already Guessed";
        }
    }

    objGuesses[d].push(movieInfo.data);            
    
    let newJsonGuesses = JSON.stringify(objGuesses);
    window.localStorage.setItem("guesses", newJsonGuesses);    
}