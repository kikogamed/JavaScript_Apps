const m = new Map();

let check = document.querySelector(".check");
let del = document.querySelector(".delete");
let add = document.querySelector(".add");
let show = document.querySelector(".show");

let input = document.querySelector("input");
let par = document.querySelector("p");
check.onclick = function() {
    par.style.width = "95%";
    par.style.padding = "12px";
    if(input.value == "") {
        par.textContent = "Item Can't Be Empty!";
    }
    else {
        if(m.has(input.value)) {
            par.textContent = `Found Local Storage Item Called '${input.value}'`;
        }
        else {
            par.textContent = `NO Local Storage Item Called '${input.value}'`;
        }
    }
};
add.onclick = function() {
    par.style.width = "95%";
    par.style.padding = "12px";
    if(input.value == "") {
        par.textContent = "Item Can't Be Empty!";
    }
    else {
        if(m.has(input.value)) {
            par.textContent = `'${input.value}' has already been added`;
        }
        else {
            m.set(input.value , 1);
            par.textContent = `'${input.value}' added successfully`;
        }
    }
};
del.onclick = function() {
    par.style.padding = "12px";
    par.style.width = "95%";
    if(input.value == "") {
        par.textContent = "Item Can't Be Empty!";
    }
    else {
        if(m.has(input.value)) {
            m.delete(input.value);
            par.textContent = `'${input.value}' has already been deleted`;
        }
        else {
            par.textContent = `No item has the name: '${input.value}'`;
        }
    }
};
show.onclick = function() {
    let t = ``;
    if(m.size == 0) {
        par.style.padding = "12px";
        par.style.width = "95%";
        par.textContent = "Empty Local Storage!";
    }
    else {
        par.textContent = "";
        m.keys().forEach(function(e) {
            let nl = document.createElement("p");
            nl.textContent = e;
            nl.style.marginBottom = "-15px";
            nl.style.color = "#02968c"
            par.style.padding = "0";
            par.style.width = "100%";
            par.appendChild(nl);
        });
    }
};