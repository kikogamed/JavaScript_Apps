let bold = document.querySelector(".bold");
let par = document.querySelector("p");

bold.onchange = function() {
    if(bold.checked) {
        par.style.fontWeight = "bold";
    }
    else {
        par.style.fontWeight = "normal";
    }
};

let invert = document.querySelector(".invert");

invert.onchange = function() {
    if(invert.checked) {
        par.style.backgroundColor = "black";
        par.style.color = "white";
    }
    else {
        par.style.backgroundColor = "white";
        par.style.color = "black";
    }
};

let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let size = document.querySelector(".size");

minus.style.opacity = ".6";
minus.style.cursor = "not-allowed";

minus.onclick = function() {
    if(size.textContent == "16") {
        minus.style.opacity = ".6";
        minus.style.cursor = "not-allowed";
    }
    else {
        size.textContent = parseInt(size.textContent) - 1;
        minus.style.opacity = "1";
        minus.style.cursor = "pointer";
        if(size.textContent == "16") {
            minus.style.opacity = ".6";
            minus.style.cursor = "not-allowed";
        }
    }
    if(size.textContent == "21") {
        plus.style.opacity = "1";
        plus.style.cursor = "pointer";
    }
    par.style.fontSize = `${size.textContent}px`;
};
plus.onclick = function() {

    if(size.textContent == "22") {
        plus.style.opacity = ".6";
        plus.style.cursor = "not-allowed";
    }
    else {
        size.textContent = parseInt(size.textContent) + 1;
        plus.style.opacity = "1";
        plus.style.cursor = "pointer";
        if(size.textContent == "22") {
            plus.style.opacity = ".6";
            plus.style.cursor = "not-allowed";
        }
    }
    if(size.textContent == "17") {
        minus.style.opacity = "1";
        minus.style.cursor = "pointer";
    }
    par.style.fontSize = `${parseInt(size.textContent)}px`;
};

let select = document.querySelector(".font");

select.onchange = function() {
    if(select.value != "none") {
        par.style.fontFamily = select.value;
    }
};