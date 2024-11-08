let currentTry = 1; // current try variable

let guessedWord = ""; // the word user guessed

let word = ""; // word user try to guess

let wordMap = new Map(); // frq arr for word user try to guess

// 100 word to guess
const words = [
    "market", "bright", "secret", "planet", "flight", "silver", "custom", "honest", "subtle", "unfold",
    "splash", "bright", "glance", "random", "shadow", "forest", "wonder", "puzzle", "strike", "gentle",
    "danger", "object", "mellow", "author", "impact", "answer", "casual", "rocket", "spirit", "jacket",
    "bounce", "turtle", "marble", "fabric", "artist", "anchor", "policy", "bucket", "genius", "bubble",
    "palace", "gospel", "copper", "violin", "rescue", "valley", "orange", "circle", "expose", "module",
    "manual", "cancel", "tender", "praise", "submit", "fabric", "prince", "submit", "garden", "pastel",
    "insist", "chorus", "expand", "vision", "resist", "remote", "insert", "sphere", "moment", "expert",
    "locate", "manage", "wander", "engage", "season", "client", "jungle", "sudden", "retail", "unveil",
    "direct", "rescue", "stress", "pocket", "immune", "monkey", "animal", "bridge", "famous", "safari",
    "extend", "native", "absent", "legend", "hidden", "avenue", "choice", "debate", "pursue", "filter"
];

word = words[Math.floor(Math.random() * 100)];  // randomize word to guess 
console.log(word);

// make every char in frq word eual 0
for(let i = 0 ; i < 6 ; i++) {
    wordMap[word[i]]=0;
}

// handle frq values
for(let i = 0 ; i < 6 ; i++) {
    wordMap[word[i]]++;
}

// function to handle inputs focus and tries focus
function selectInput() {

    // select all inputs
    let allInputs = document.querySelectorAll("input");
    // select all lines
    let line = document.querySelectorAll(`.line`);

    // make every input that is not in current try be unusable
    for(let i = 0 ; i < allInputs.length ; i++) {
        // if input is not in current try
        if(!allInputs[i].parentElement.parentElement.classList.contains(`t${currentTry}`)) {
            // make focus underline width = 0
            allInputs[i].onfocus = () => {
                line[i].style.width = "0%";
            }
            // make inputs can't typed in or tabed
            allInputs[i].readOnly = true;
            allInputs[i].tabIndex = '-1';
        }
        else {
            // handle inputs in current array to be focused and writable
            allInputs[i].onfocus = () => {
                line[i].style.width = "100%";
            }
            allInputs[i].onblur = () => {
                line[i].style.width = "0%";
            }
            allInputs[i].readOnly = false; 
            allInputs[i].tabIndex = '1';
        }
    }

    // select current try name and make its color black
    let tryName = document.querySelector(`.t${currentTry} p`);
    tryName.style.color = "black";

    // if current try > 1 make previous try name not black
    if(currentTry > 1) {
        let previousTryName = document.querySelector(`.t${currentTry-1} p`);
        previousTryName.style.color = "#a7a7a7";
    }

    // select current try inputs
    let inputs = document.querySelectorAll(`.t${currentTry} input`);
    // focus on first input
    inputs[0].focus();

    for(let i = 0 ; i < inputs.length ; i++) {
        // handle when i type in input
        inputs[i].oninput = () => {
            // if input val length = 1 and it's not last one
            // blur it and go to next
            if(inputs[i].value.length == 1 && i < 5) {
                inputs[i].blur();
                inputs[i+1].focus(); 
                inputs[i].maxLength = 1;
            }
        }

    }

    // Handle keyboard keys with inputs
    for(let i = 0 ; i < inputs.length ; i++) {
        inputs[i].onkeydown = (e) => {
            // Backspace
            if(e.key == "Backspace") {
                // if value length = 0 and it's not first input
                // back to previous input
                if(inputs[i].value.length == 0 && i > 0) {
                    inputs[i].blur();
                    inputs[i-1].focus();
                }   
                // else clear input
                else if(inputs[i].value.length == 1 && inputs[i].readOnly == false) {
                    inputs[i].value = "";
                }
            }
            // enter click check button
            if(e.key == "Enter") {
                inputs[i].blur();
                check.click();
            }
            // left arrow got to previous input
            if(e.key == "ArrowLeft" && i > 0) {
                inputs[i].blur();
                inputs[i-1].focus();
            }
            // right arrow got to next input
            if(e.key == "ArrowRight" && i < 5) {
                inputs[i].blur();
                inputs[i+1].focus();
            }
        }
    }
}
// call function when page load to focus on first try
selectInput();

// map for correct guesses indexes
let correctMap = new Map();
for(let i = 0 ; i < 6 ;i++) correctMap[i]=0;

// var for correct guesses number
let correct = 0;

// select check button
let check = document.querySelector(".check");
check.onclick = () => {
    // select current try inputs
    let inputs = document.querySelectorAll(`.t${currentTry} input`);

    // get guessed word from inputs
    for(let i = 0 ; i < inputs.length ; i++) {
        guessedWord += inputs[i].value;
    }

    // if guessd word length == 6
    if(guessedWord.length == 6) {

        // loop in inputs
        for(let i = 0 ; i < inputs.length ; i++) {
            // if input right and in place
            if(inputs[i].value == word[i]) {
                // handle colors
                inputs[i].style.color = "white";
                inputs[i].style.backgroundColor = "#ff9d0d";

                // save right guessed index and icreament counter
                correctMap[i]++;
                correct++;
            }
            // else if input right but not in place
            else if(wordMap[inputs[i].value] > 0) {
                inputs[i].style.color = "white";
                inputs[i].style.backgroundColor = "#0ba78a";
            }
            // else if input not right
            else {
                inputs[i].style.color = "white";
                inputs[i].style.backgroundColor = "#252f41";
            }

            // if we are not in last try and player didn't win
            if(currentTry < 6 && word != guessedWord) {
                new Audio("./sounds/wrong-answer.MP3").play();
            }
            correct = 0;
        }

        // flag to know that game hasn't finished
        let flag = 1;

        // if guessed word = word player try to guess
        if(guessedWord == word) {
            win(); // call win function 
            flag = 0; // make flag = 0
        }
        else if(currentTry == 6) {
            lose();// call lose function 
        }

        // if game hasn't finished
        if(flag) {
            currentTry++;
            selectInput();
        }
    }
    // make guessed word empty again for next tries
    guessedWord = "";
}

// if i focus on check btn and pressed enter 
// click it
check.onfocus = () => {
    check.addEventListener("keydown" , function(e) {
        if(e.key == "Enter") {
            check.click();
        }
    });
}

// Play Again

// select play again btn
let again = document.querySelector(".finish button");

again.onclick = () => {
    location.reload(); // reload page
}

// Hint 

// select hint btn
let hint = document.querySelector(".hint");
// select remaining hints
let remainingHints = document.querySelector(".hint span");

let z = -1; // temp to know if x has been choosed before
let c = 0; // var to calc remaining hints
let x = -1; // var to get choosed index to hint

// make remaining hints = 2 - used hints
remainingHints.textContent = `${2 - c}`;

hint.onclick = () => {
    // if player used less than 2 hints
    if(c < 2) {
        // if player guessed right 5 chars 
        // make him use only one hint
        if(correct == 5) {
            c++;
        }

        // while choosed index has choosed before 
        // or while player guessed this index before
        // choose another index to help player
        while(x == z || (correctMap[x] > 0) ) {
            x = Math.floor(Math.random() * 6);
            console.log(x);
        }

        // store choosed index
        z = x;

        // select current try inputs
        let inputs = document.querySelectorAll(`.t${currentTry} input`);
        // make choosed index value = word value of same index
        inputs[x].value = word[x];
        // make input be read only
        inputs[x].readOnly = true;

        // increase used hints by one
        c++;
        // edit remaining hints 
        remainingHints.textContent = `${2 - c}`;
    }
}

// win function
function win() {
    // select finish container
    let finish = document.querySelector(".finish");
    // select p of finish (sentence to tell player he win)
    let p = document.querySelector(".finish p");
    p.textContent = "Congratulations, You Won!";
    p.style.cssText = "animation: colors 1s infinite alternate ease-in-out;";
    // if player won without hints
    if(c == 0) {
        p.textContent = "WOOOOOW Without Hints!!!";
    }
    
    // play won sound
    new Audio("./sounds/new-level.MP3").play();

    // adjust finish container 
    finish.style.display = "flex";
    finish.style.alignItems = "center";
    finish.style.flexDirection = "column";

    // make check and hint btns disabled
    check.disabled = true;
    hint.disabled = true;

    // make inputs read only
    let inputs = document.querySelectorAll("input");
    inputs.forEach((e) => {
        e.readOnly = true;
    });
}

// lose function
function lose() {
    // select finish container
    let finish = document.querySelector(".finish");
    // select p of finish (sentence to tell player he lose)
    let p = document.querySelector(".finish p");
    p.textContent = `The Word Was "${word.toUpperCase()}"`;
    p.style.color = "black";
    p.style.cssText = "text-shadow: 2px 2px 3px #e0e0e0;";

    // play lose sound
    new Audio("./sounds/lose.MP3").play();

    // adjust finish container
    finish.style.display = "flex";
    finish.style.alignItems = "center";
    finish.style.flexDirection = "column";

    // disable check and hint btns
    check.disabled = true;
    hint.disabled = true;
}