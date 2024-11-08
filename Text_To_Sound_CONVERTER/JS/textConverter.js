let speech = new SpeechSynthesisUtterance();

let btn = document.querySelector("button");
let txt = document.querySelector("textarea");

btn.onclick = () => {
    speech.text = txt.value;
    window.speechSynthesis.speak(speech);
}


let voices = [];
let select = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((e , i) => {
        select.options[i] = new Option(e.name , i);
    });
}

select.onchange = () => {
    speech.voice = voices[parseInt(select.value)];
}