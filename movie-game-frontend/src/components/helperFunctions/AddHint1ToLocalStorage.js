export default function addHint1ToLocalStorage(keyWord){
    let d = new Date().toLocaleDateString();
    let jsonString = window.localStorage.getItem("hints");
    let hintsObj= JSON.parse(jsonString);

    if(hintsObj[d] === undefined){
        hintsObj[d] ={"keyWord1":null, "keyWord2":null, "tagline":null};
    }

    hintsObj[d]["keyWord1"] = keyWord;

    window.localStorage.setItem("hints", JSON.stringify(hintsObj));
}