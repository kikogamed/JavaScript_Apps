// if there is no max score add max score = 1
if(!window.localStorage.getItem("max")) 
    window.localStorage.setItem("max" , 1);


// array of random imgs' sources
let imgSource = [
    ['./imgs/random/1.png' , 1],
    ['./imgs/random/1.png' , 1],
    ['./imgs/random/2.jpeg' , 2],
    ['./imgs/random/2.jpeg' , 2],
    ['./imgs/random/3.jpeg' , 3],
    ['./imgs/random/3.jpeg' , 3],
    ['./imgs/random/4.png' , 4],
    ['./imgs/random/4.png' , 4],
    ['./imgs/random/5.jpeg' , 5],
    ['./imgs/random/5.jpeg' , 5],
    ['./imgs/random/6.jpeg' , 6],
    ['./imgs/random/6.jpeg' , 6],
    ['./imgs/random/7.jpeg' , 7],
    ['./imgs/random/7.jpeg' , 7],
    ['./imgs/random/8.png' , 8],
    ['./imgs/random/8.png' , 8],
    ['./imgs/random/9.png' , 9],
    ['./imgs/random/9.png' , 9],
    ['./imgs/random/10.jpeg' , 10],
    ['./imgs/random/10.jpeg' , 10]
];

// randomize imgs proccess
for(let i = imgSource.length - 1 ; i >= 0 ; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [imgSource[i] , imgSource[j]] = [imgSource[j] , imgSource[i]];
}

// container of question imgs and random ones
let imgsDiv = document.querySelectorAll(".imgs div");

// display random imgs behind question imgs
for(let i = 0 ; i < imgSource.length ; i++) {
    let img = document.createElement("img");
    // set img source
    img.src = imgSource[i][0];
    // set img val
    img.setAttribute("value" , imgSource[i][1]);
    // add random class
    img.classList.add("random");
    // add random img to container
    imgsDiv[i].appendChild(img);
}


// Start Game

let btn = document.querySelectorAll(".btn"); // levels btns
let time = document.querySelector(".time span"); // time
let tries = document.querySelector(".tries span"); // tries

// score
let score = 1;

btn.forEach(e => {
    e.onclick = function() {
        // hide levels and start game onclick of one of levels
        e.parentElement.parentElement.style.display = "none";

        if(e.getAttribute("value") == '1') { // easy
            time.textContent = "120";
            tries.textContent = "50";
        }
        else if(e.getAttribute("value") == '2') { // medium
            time.textContent = "90";
            tries.textContent = "20";
            score = 50;
        }
        else if(e.getAttribute("value") == '3') { // hard
            time.textContent = "60";
            tries.textContent = "15";
            score = 5000;
        }
        else { // impossible
            time.textContent = "30";
            tries.textContent = "10";
            score = 100000;
        }

        // rotate random imgs after 2sec
        function rotateToShow() {
            for(let i = 0 ; i < imgs.length ; i++) {
                imgs[i].style.cssText = "transform: rotateY(0deg);";
                q[i].style.cssText = "transform: rotateY(180deg);";
            }
        }
        rotateToShow();

        function rotateToHide() {
            for(let i = 0 ; i < imgs.length ; i++) {
                imgs[i].style.cssText = "transform: rotateY(180deg);";
                q[i].style.cssText = "transform: rotateY(0deg);";
            }
        }
        setTimeout(rotateToHide, 1000);

    }   
});

// Time and Tries 
let intTime = -1;
let intTries = -1;

// interval to handle time display
let interval = setInterval(function() {

    // integer variable of displayed time
    intTime = parseInt(time.textContent);

    // minus time by 1 every sec
    intTime--;

    // show time
    time.textContent = `${intTime}`; 

    // stop timer when it become 0 and lose
    if(intTime == 0) {
        fail();
        clearInterval(interval);
    }
},1000);


// Question mark imgs
let q = document.querySelectorAll(".q");
// imgs 
let imgs = document.querySelectorAll(".random");

// Counter to count moves
let c = 0;
// Vals of clicked imgs
let val1 = 0 , val2 = 0;

// index of first clicked img
let idx = -1; 

// counter for correct guessed imgs
let x = 0;

// score and max score spans
let displayScore = document.querySelector(".score span");
let maxScore = document.querySelector(".max span");

// game
for(let i = 0 ; i < q.length ; i++) {

    // clicking question img
    q[i].onclick = function() {
        // rotate question img
        q[i].style.cssText = "transform: rotateY(180deg);";
        // show random img
        imgs[i].style.cssText = "transform: rotateY(0deg);";


        // increase case by one
        c++; 
        // case 0: no img clicked
        // case 1: first img clicked
        // case 2: second img clicked

        // Touch Sound
        let touch = new Audio("./sounds/touch.M4A");
        touch.play();

        // if case = 1
        if(c == 1) {
            // save val and index of first clicked img
            val1 = imgs[i].getAttribute("value");
            idx = i;
        }
        // if case = 2
        else {
            // store val of second clicked img
            val2 = imgs[i].getAttribute("value");

            // if clicked imgs are the same
            if(val1 == val2) {

                // increase correct guesses by one
                x++;

                // correct sound
                let correct = new Audio("./sounds/correct.M4A");
                correct.play();

                // if correct guesses = 10 (player won)
                if(x == 10) {
                    // winning

                    // get time and tries and store them as integers
                    intTime = parseInt(time.textContent);
                    intTries = parseInt(tries.textContent);

                    // calc score and display it
                    score *= intTime * intTries;
                    displayScore.textContent = `${score}`;

                    // calc max score and display it
                    window.localStorage.setItem("max" , Math.max(score , parseInt(window.localStorage.getItem("max"))));
                    let maxi = parseInt(window.localStorage.getItem("max"));
                    maxScore.textContent = `${maxi}`;

                    // won sound effect
                    let won = new Audio("./sounds/won.M4A");
                    won.play();

                    // display winning page
                    let win = document.querySelector(".win");
                    win.style.display = "block";

                    // stop timer
                    clearInterval(interval);
                }
            }
            // if clicked imgs are different
            else {
                // show clicked imgs and rotate them after .4sec
                setTimeout( ()=> {
                    q[idx].style.cssText = "transform: rotateY(0deg);";
                    imgs[idx].style.cssText = "transform: rotateY(180deg);";
                    q[i].style.cssText = "transform: rotateY(0deg);";
                    imgs[i].style.cssText = "transform: rotateY(180deg);";
                }
                , 400);

                // Wrong Sound
                let wrong = new Audio("./sounds/wrong.M4A");
                wrong.play();

                intTries = parseInt(tries.textContent);
                intTries--; // decrease remaining tries by one
                tries.textContent = `${intTries}`

                // if there's no remaining tries
                if(intTries == 0 && x != 10) {
                    fail(); // player lose
                }
            }

            // make case = 0
            c = 0;

        }
    }

}


// Play Again 

let again = document.querySelectorAll(".again");
again.forEach((e) => {
    e.onclick = function() {
        location.reload();
    }
})

// Fail Function

function fail() {
    clearInterval(interval);
    let loseSound = new Audio("./sounds/fail.M4A");
    loseSound.play();
    let losePage = document.querySelector(".lose");
    losePage.style.display = "block";
}