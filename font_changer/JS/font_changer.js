let sele = document.querySelector(".sel");
let par = document.querySelector("p");

sele.onchange = function() {
    par.style.fontFamily = `${sele.value}`;
};