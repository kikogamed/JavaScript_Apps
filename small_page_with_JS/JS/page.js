// Members sidebar
let mem_btn = document.querySelectorAll(".members button");
let mem_div = document.querySelectorAll(".members .parent");
mem_btn.forEach(function(e) {
    e.onclick = function() {
        mem_btn.forEach(function(ev){
            ev.classList.remove("active");
        });
        e.classList.add("active");
        mem_div.forEach(function(ev) {
            ev.style.display = "none";
            if(ev.classList.contains(`${e.textContent}`)) {
                ev.style.display = "block";
            }
        });
    }
});
// Groups sidebar
let gro_btn = document.querySelectorAll(".groups button");
let gro_div = document.querySelectorAll(".groups .parent");
gro_btn.forEach(function(e) {
    e.onclick = function() {
        gro_btn.forEach(function(ev){
            ev.classList.remove("active");
        });
        e.classList.add("active");
        gro_div.forEach(function(ev) {
            ev.style.display = "none";
            if(ev.classList.contains(`${e.textContent}`)) {
                ev.style.display = "block";
            }
        });
    }
});


// CALENDER

let minus = document.querySelector(".left-arr"); // left arrow 
let plus = document.querySelector(".right-arr"); // right arrow
let mo = document.querySelector(".date span"); // month word in top of calendar
let th = document.querySelector(".thirty"); // day 30
let tho = document.querySelector(".thirty-one"); // day 31
let days = document.querySelectorAll(".day div") // all days' numbers

// Map to set month with its number
let m = new Map();
m[1] = "Jan";
m[2] = "Feb";
m[3] = "Mar";
m[4] = "Apr";
m[5] = "May";
m[6] = "Jun";
m[7] = "Jul";
m[8] = "Aug";
m[9] = "Sep";
m[10] = "Oct";
m[11] = "Nov";
m[12] = "Dec";

// today's date
let date = new Date()

let month = date.getMonth() + 1; // this month
let thisMonth = month; // this month
let day = date.getDate(); // today's day of month

if(month == 12) { // if month = 12 hide right arrow 
    plus.style.display = "none"; 
}
if(month == 1) { // if month = 1 hide left arrow
    minus.style.display = "none";
}

// handle day 31 cases
if((month % 2 && month < 9) || (month % 2 == 0 && month >= 8)) {
    tho.style.display = "block";
}
else tho.style.display = "none";

// handle day 30 in feb
if(month == 2) {
    th.style.display = "none";
}
else th.style.display = "block";

// make month word = this month using map
mo.textContent = `${m[month]}`;

// active today on calendar
days.forEach(function(e) {
    if(e.textContent == String(day)) 
        e.classList.add("active-day");
})

let letters = document.querySelectorAll(".letter"); // days' names
let fday = new Date(`2024-${month}-1`); // first day of the month
let daysArr = ["Su" , "Mo" , "Tu" , "We" , "Th" , "Fr" , "Sa"]; // days names array
let fd = fday.getDay(); // get today's day index

// handle displaying days on calendar acconrding to first day of the month
letters.forEach(function(e) {
    e.textContent = daysArr[fd % 7];
    fd++;
});

// add a class to today's day of the month to active or disactive it later
let thisDay = document.querySelector(".active-day");
thisDay.classList.add("d");
thisDay = document.querySelector(".d");

minus.onclick = function() {
    month--;
    if(month == 11) {
        plus.style.display = "block";
    }
    if(month == 1) {
        minus.style.display = "none";
    }
    if((month % 2 && month < 9) || (month % 2 == 0 && month >= 8)) {
        tho.style.display = "block";
    }
    else tho.style.display = "none";
    if(month == 2) {
        th.style.display = "none";
    }
    else th.style.display = "block";
    mo.textContent = `${m[month]}`;
    if(month == thisMonth) {
        thisDay.classList.add("active-day");
    }
    else if(thisDay.classList.contains("active-day")) {
        thisDay.classList.remove("active-day");
    }

    fday = new Date(`2024-${month}-1`);
    fd = fday.getDay();
    letters.forEach(function(e) {
        e.textContent = daysArr[fd % 7];
        fd++;
    });
}
plus.onclick = function() {
    month++;
    if(month == 2) {
        minus.style.display = "block";
    }
    if(month == 12) {
        plus.style.display = "none";
    }
    if((month % 2 && month < 9) || (month % 2 == 0 && month >= 8)) {
        tho.style.display = "block";
    }
    else tho.style.display = "none";
    if(month == 2) {
        th.style.display = "none";
    }
    else th.style.display = "block";
    mo.textContent = `${m[month]}`;
    if(month == thisMonth) {
        thisDay.classList.add("active-day");
    }
    else if(thisDay.classList.contains("active-day")) {
        thisDay.classList.remove("active-day");
    }

    fday = new Date(`2024-${month}-1`);
    fd = fday.getDay();
    letters.forEach(function(e) {
        e.textContent = daysArr[fd % 7];
        fd++;
    });
}

// img side baaaar

let bullets = document.querySelectorAll(".bullets div");
let imgs = document.querySelectorAll(".imgs .i");
let iOne = document.querySelector(".img-one");
let iTwo = document.querySelector(".img-two");
let iThree = document.querySelector(".img-three");
let f = 0; // flag to see if bullets and arrows clicked or not
let c = 1; // counter to know slide index

bullets.forEach(function(e) {
    e.onclick = function() {
        f=1;
        bullets.forEach(function(ev) {
            ev.classList.remove("active-bull");
        });
        e.classList.add("active-bull");
        if(e.classList.contains("one")) {
            if(c != 1) {
                c = 1;
                iTwo.style.right = "120%";
                iThree.style.right = "120%";
                iOne.style.right = "0px";
            }
        }
        else if(e.classList.contains("two")) {
            if(c != 2) {
                c = 2;
                iTwo.style.right = "0px";
                iThree.style.right = "120%";
                iOne.style.right = "120%";
            }
        }
        else {
            if(c != 3) {
                c = 3;
                iTwo.style.right = "120%";
                iThree.style.right = "0px";
                iOne.style.right = "120%";
            }
        }
    }
});

// choose img by arrows
let leftArrow = document.querySelector(".l");
let rightArrow = document.querySelector(".r");
let bullOne = document.querySelector(".bullets .one");
let bullTwo = document.querySelector(".bullets .two");
let bullThree = document.querySelector(".bullets .three");


leftArrow.onclick = function() {
    bullets.forEach(function(ev) {
        ev.classList.remove("active-bull");
    });
    if(c == 1) {
        c = 3;
        iTwo.style.right = "120%";
        iThree.style.right = "0px";
        iOne.style.right = "120%";
        bullThree.classList.add("active-bull");
    }
    else if(c == 2) {
        c = 1;
        iTwo.style.right = "120%";
        iThree.style.right = "120%";
        iOne.style.right = "0px";
        bullOne.classList.add("active-bull");
    }
    else {
        c = 2;
        iTwo.style.right = "0px";
        iThree.style.right = "120%";
        iOne.style.right = "120%";
        bullTwo.classList.add("active-bull");
    }
    f=1;
}

rightArrow.onclick = function() {
    bullets.forEach(function(ev) {
        ev.classList.remove("active-bull");
    });
    if(c == 2) {
        c = 3;
        iTwo.style.right = "120%";
        iThree.style.right = "0px";
        iOne.style.right = "120%";
        bullThree.classList.add("active-bull");
    }
    else if(c == 3) {
        c = 1;
        iTwo.style.right = "120%";
        iThree.style.right = "120%";
        iOne.style.right = "0px";
        bullOne.classList.add("active-bull");
    }
    else {
        c = 2;
        iTwo.style.right = "0px";
        iThree.style.right = "120%";
        iOne.style.right = "120%";
        bullTwo.classList.add("active-bull");
    }
    f=1;
}

// move every 5 sec

function moveSlides() {
    // if bullets and arrows haven't been clicked in last 5 sec 
    // move to next slide automaticly
    if(!f) {
        bullets.forEach(function(ev) {
            ev.classList.remove("active-bull");
        });
        if(c == 1) {
            c = 3;
            iTwo.style.right = "120%";
            iThree.style.right = "0px";
            iOne.style.right = "120%";
            bullThree.classList.add("active-bull");
        }
        else if(c == 2) {
            c = 1;
            iTwo.style.right = "120%";
            iThree.style.right = "120%";
            iOne.style.right = "0px";
            bullOne.classList.add("active-bull");
        }
        else {
            c = 2;
            iTwo.style.right = "0px";
            iThree.style.right = "120%";
            iOne.style.right = "120%";
            bullTwo.classList.add("active-bull");
        }
    }
    // call function every 5 sec
    setTimeout(moveSlides , 5000);
    // change flag value to zero after 5 sec from clicking arrows and bullets 
    setTimeout(() => {f=0;}, 5000);
}
moveSlides();

// Latest Activityyyyyy

let read = document.querySelectorAll(".read");
let more = document.querySelectorAll(".more");
for(let i = 0 ; i < read.length ; i++) {
    read[i].onclick = function() {
        more[i].style.setProperty("display" , "block" , "important");
        read[i].style.display = "none";
    }
}

let load = document.querySelector(".load");
let aa = document.querySelectorAll(".aa");
load.onclick = function() {
    aa.forEach(function(e) {
        e.style.setProperty("display" , "flex" , "important");
    })
    load.style.display = "none";
}

// latest posts

let x = 1;
let next = document.querySelector(".slide .arr2");
let prev = document.querySelector(".slide .arr1");
let page1 = document.querySelector(".page1");
let page2 = document.querySelector(".page2");
let n1 = document.querySelector(".n1");
let n2 = document.querySelector(".n2")

next.onclick = function() {
    prev.style.display = "block";
    next.style.display = "none";
    page2.style.display = "block";
    page1.style.display = "none";
    n2.classList.add("active");
    n1.classList.remove("active");
}
n2.onclick = next.onclick;

prev.onclick = function() {
    prev.style.display = "none";
    next.style.display = "block";
    page2.style.display = "none";
    page1.style.display = "block";
    n1.classList.add("active");
    n2.classList.remove("active");
}
n1.onclick = prev.onclick;

// Delete Button

let del = document.querySelectorAll(".x")
let pop = document.querySelector(".pop")
let yes = document.querySelectorAll(".yes")
let no = document.querySelectorAll(".no")
let nt = document.querySelector(".nt")
let overlay = document.querySelector(".overlay")
let counter = 3

del.forEach(function(e) {
    e.onclick = function() {
        pop.style.cssText = "transform: scale(1);"
        overlay.style.display = "block"

        // To center pop in the center of user where
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        pop.style.transform = `translate(-50%, -50%) translate(${scrollLeft}px, ${scrollTop}px)`;

        yes.forEach(function(ev) {
            ev.onclick = function() {
                pop.style.cssText = "transform: scale(0);"
                overlay.style.display = "none"
                e.parentElement.style.display = "none"
                counter--
                if(counter == 0) {
                    nt.style.display = "block"
                }
            }
        })
        no.forEach(function(ev) {
            ev.onclick = function() {
                overlay.style.display = "none"
                pop.style.cssText = "transform: scale(0);"
            }
        })
    }
})