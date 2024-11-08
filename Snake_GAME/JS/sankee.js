let game = document.querySelector(".game");
let flag = 1;
let interval;
let food = document.createElement("div");
let foodX = 1, foodY = 1;
let direction = "";
let lastX , lastY;
let time = 500;
let overFlag = 0;
let startFlag = 0;
let pauseFlag = 0;

window.onkeydown = (e) => {
    if(overFlag) return;
    if((e.key == "ArrowLeft" || e.key == "a") && !pauseFlag) {
        if(direction != "l" && direction != "r") {
            clearInterval(interval);
            goLeft();
            interval = setInterval(goLeft , time);
            direction = "l";
        }
        startFlag = 1;
    }
    if((e.key == "ArrowRight" || e.key == "d") && !pauseFlag && startFlag) {
        if(direction != "r" && direction != "l") {
            clearInterval(interval);
            goRight();
            interval = setInterval(goRight , time);
            direction = "r";
        }
        startFlag = 1;
    }  
    if((e.key == "ArrowUp" || e.key == "w") && !pauseFlag) {
        if(direction != "u" && direction != "d") {
            clearInterval(interval);
            goUp();
            interval = setInterval(goUp , time);
            direction = "u";
        }
        startFlag = 1;
    }    
    if((e.key == "ArrowDown" || e.key == "s") && !pauseFlag) {
        if(direction != "d" && direction != "u") {
            clearInterval(interval);
            goDown();
            interval = setInterval(goDown , time);
            direction = "d";
        }
        startFlag = 1;
    }
    if(e.key == " ") {
        let scale = document.querySelector(".stop");
        if(!pauseFlag) {
            scale.style.display = "block";
            clearInterval(interval);
            clearInterval(foodInterval);
        }
        else {
            scale.style.display = "none";
            foodInterval = setInterval(makeFood , 1000);
            if(direction == "l") interval = setInterval(goLeft , time);
            if(direction == "r") interval = setInterval(goRight , time);
            if(direction == "u") interval = setInterval(goUp , time);
            if(direction == "d") interval = setInterval(goDown , time);
        }
        pauseFlag = !pauseFlag;
    }
}

let foodInterval = setInterval(makeFood , 1000);
function makeFood() {
    if(flag == 1) {
        food = document.createElement("div");
        food.classList.add("food");
        foodX = Math.floor(Math.random() * 21);
        if(foodX <= 0) foodX = 1;
        foodY = Math.floor(Math.random() * 21);
        if(foodY <= 0) foodY = 1;
        food.style.gridColumnStart = `${foodX}`;
        food.style.gridRowStart = `${foodY}`;
        game.appendChild(food);
        flag = 0;
    }
}

function is_eaten() {
    return snakeBody[0].x == foodX && snakeBody[0].y == foodY;
}

function eat_food() {
    food.remove();
    flag = 1;

    snakeBody.push({lastX , lastY});
    let square = document.createElement("div");
    if(direction == "l") {
        square.style.gridColumnStart = lastX + 1;
        square.style.gridRowStart = lastY;
    }
    else if(direction == "r") {
        square.style.gridColumnStart = lastX - 1;
        square.style.gridRowStart = lastY;
    }
    else if(direction == "u") {
        square.style.gridColumnStart = lastX;
        square.style.gridRowStart = lastY + 1;
    }
    else {
        square.style.gridColumnStart = lastX;
        square.style.gridRowStart = lastY - 1;
    }
    square.classList.add("square");
    game.appendChild(square);

    if(snakeBody.length % 5 == 0 && time > 50) {
        time -= 50;
        console.log(time);
    }

    new Audio("./sounds/eat.mp3").play();
}

function checkLose() {
    if(snakeBody[0].x <= 0 || snakeBody[0].y <= 0 || snakeBody[0].x > 21 || snakeBody[0].y > 21) {
        return true;
    }

    for(let i = 1 ; i < snakeBody.length ; i++) {
        if(snakeBody[i].x == snakeBody[0].x && snakeBody[i].y == snakeBody[0].y) {
            return true;
        }
    }
}

function gameOver() {
    clearInterval(interval);
    clearInterval(foodInterval);
    let end = document.querySelector(".end");
    end.style.display = "block";
    overFlag = 1;

    new Audio("./sounds/gameOver.wav").play();

    let again = document.querySelector(".again");
    again.onclick = () => {
        location.reload();
    }
    window.onkeydown = (e) => {
        if(overFlag) {
            if(e.key == "Enter" || e.key == " ") {
                again.click();
            }
        }
    }
}


const snakeBody = [
    {x: 10 , y: 11},
    {x: 11 , y: 11},
    {x: 12 , y: 11}
];

function draw() {
    snakeBody.forEach(e => {
        let square = document.createElement("div");
        square.style.gridColumnStart = e.x;
        square.style.gridRowStart = e.y;
        square.classList.add("square");
        game.appendChild(square);
    });
    let head = document.querySelector(".square");
    head.style.position = "relative";
    let rightEye = document.createElement("div");
    rightEye.classList.add("eye");
    rightEye.classList.add("right");
    let leftEye = document.createElement("div");
    leftEye.classList.add("eye");
    leftEye.classList.add("left");
    head.appendChild(rightEye);
    head.appendChild(leftEye);
} 
draw();
function shift() {
    for(let i = snakeBody.length - 2 ; i >= 0 ; i--) {
        snakeBody[i+1] = {...snakeBody[i]};
    }
}
function update() {
    let snakeSegments = document.querySelectorAll(".square");
    for(let i = 0 ; i < snakeSegments.length ; i++) {
        snakeSegments[i].style.gridColumnStart = snakeBody[i].x;
        snakeSegments[i].style.gridRowStart = snakeBody[i].y;
    }
}

let leftEye = document.querySelector(".left");
let rightEye = document.querySelector(".right");

function goUp() {
    if(overFlag) return;
    shift();
    snakeBody[0].y -= 1;
    if(is_eaten()) {
        lastX = snakeBody[snakeBody.length - 1].x;
        lastY = snakeBody[snakeBody.length - 1].y;
        direction = "u";
        eat_food();
    }
    if(checkLose()) {
        gameOver();
    }
    update();
    leftEye.style.cssText = "left: 18px; top: 15%;";
    rightEye.style.cssText = "left: 3px; top: 15%;";
}

function goDown() {
    if(overFlag) return;
    shift();
    snakeBody[0].y += 1;
    if(is_eaten()) {
        lastX = snakeBody[snakeBody.length - 1].x;
        lastY = snakeBody[snakeBody.length - 1].y;
        direction = "d";
        eat_food();
    }
    if(checkLose()) {
        gameOver();
    }
    update();
    leftEye.style.cssText = "left: 18px; top: 66%;";
    rightEye.style.cssText = "left: 3px; top: 66%;";
}

function goLeft() {
    if(overFlag) return;
    shift();
    snakeBody[0].x -= 1;
    if(is_eaten()) {
        lastX = snakeBody[snakeBody.length - 1].x;
        lastY = snakeBody[snakeBody.length - 1].y;
        direction = "l";
        eat_food();
    }
    if(checkLose()) {
        gameOver();
    }
    update();
    leftEye.style.cssText = "left: 3px; top: 15%;";
    rightEye.style.cssText = "left: 3px; top: 66%;";
}

function goRight() {
    if(overFlag) return;
    shift();
    snakeBody[0].x += 1;
    if(is_eaten()) {
        lastX = snakeBody[snakeBody.length - 1].x;
        lastY = snakeBody[snakeBody.length - 1].y;
        direction = "r";
        eat_food();
    }
    update();
    if(checkLose()) {
        gameOver();
    }
    leftEye.style.cssText = "left: 18px; top: 15%;";
    rightEye.style.cssText = "left: 18px; top: 66%;";
}