let original = document.querySelector(".original");
let imgs = document.querySelector(".imgs");
let originalImg = document.querySelector(".original img");
let slider = document.querySelector(".slider");

let leftSide = imgs.offsetLeft;

slider.style.left = "80%"
originalImg.style.width = imgs.offsetWidth + "px";


imgs.onmousemove = e => {
    let originalWidth = (e.pageX - leftSide) + "px";
    original.style.width = originalWidth;

    slider.style.left = e.pageX + "px";
};