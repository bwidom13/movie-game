export default function getHint1FromLocalStorage(){
    let d = new Date().toLocaleDateString();
    let jsonString = window.localStorage.getItem("hints");
    let hintsObj= JSON.parse(jsonString);

    let hint = hintsObj[d]["keyWord1"];
    return hint;
}