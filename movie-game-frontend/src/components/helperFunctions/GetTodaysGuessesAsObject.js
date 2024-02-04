export default function getTodaysGuessesAsObject(){
    let d = new Date().toLocaleDateString();
    
    if (window.localStorage.getItem("guesses") === null) { 
        let obj = {};
        obj[d] = [];
        let json = JSON.stringify(obj);
        window.localStorage.setItem("guesses",
            json
        );
    }
    
    let guessJSON = window.localStorage.getItem("guesses");
    let objJSON = JSON.parse(guessJSON);
    if(objJSON[d] === undefined){
        objJSON[d] = [];
        window.localStorage.setItem("guesses", JSON.stringify(objJSON));
    }
    
    return objJSON[d];
}