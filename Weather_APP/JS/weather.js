// Create a map for Egyptian governorates weather data
const egyptWeatherMap = new Map();

// Add data for each governorate
egyptWeatherMap.set("Cairo", [30, 60, 15, "clear"]);
egyptWeatherMap.set("Alexandria", [28, 70, 20, "Cloudy"]);
egyptWeatherMap.set("Giza", [32, 50, 10, "Clear"]);
egyptWeatherMap.set("Luxor", [38, 40, 25, "clear"]);
egyptWeatherMap.set("Aswan", [40, 30, 30, "clear"]);
egyptWeatherMap.set("Asyut", [35, 45, 18, "Clear"]);
egyptWeatherMap.set("Beheira", [29, 65, 12, "drizzle"]);
egyptWeatherMap.set("Beni Suef", [34, 50, 17, "Clear"]);
egyptWeatherMap.set("Dakahlia", [30, 70, 15, "Cloudy"]);
egyptWeatherMap.set("Damietta", [27, 75, 22, "Cloudy"]);
egyptWeatherMap.set("Faiyum", [19, 55, 14, "rain"]);
egyptWeatherMap.set("Gharbia", [31, 68, 16, "drizzle"]);
egyptWeatherMap.set("Ismailia", [32, 60, 19, "clear"]);
egyptWeatherMap.set("Kafr Elsheikh", [29, 72, 15, "Cloudy"]);
egyptWeatherMap.set("Matruh", [26, 80, 25, "rain"]);
egyptWeatherMap.set("Minya", [36, 50, 20, "Clear"]);
egyptWeatherMap.set("Monufia", [31, 67, 16, "drizzle"]);
egyptWeatherMap.set("New Valley", [39, 35, 28, "clear"]);
egyptWeatherMap.set("North Sinai", [27, 65, 21, "clear"]);
egyptWeatherMap.set("Port Said", [28, 75, 18, "Cloudy"]);
egyptWeatherMap.set("Qalyubia", [-1, 63, 15, "snow"]);
egyptWeatherMap.set("Qena", [37, 42, 22, "clear"]);
egyptWeatherMap.set("Red Sea", [35, 55, 24, "clear"]);
egyptWeatherMap.set("Sharqia", [32, 62, 17, "drizzle"]);
egyptWeatherMap.set("Sohag", [36, 45, 19, "Clear"]);
egyptWeatherMap.set("South Sinai", [11, 60, 22, "rain"]);
egyptWeatherMap.set("Suez", [22, 65, 18, "rain"]);
egyptWeatherMap.set("New York", [25, 65, 10, "clear"]);
egyptWeatherMap.set("Tokyo", [28, 70, 15, "Cloudy"]);
egyptWeatherMap.set("London", [18, 80, 12, "Rain"]);
egyptWeatherMap.set("Paris", [22, 75, 8, "Cloudy"]);
egyptWeatherMap.set("Shanghai", [30, 85, 20, "clear"]);
egyptWeatherMap.set("São Paulo", [26, 60, 18, "Clear"]);
egyptWeatherMap.set("Mumbai", [32, 90, 25, "clear"]);
egyptWeatherMap.set("Los Angeles", [27, 55, 9, "clear"]);
egyptWeatherMap.set("Moscow", [15, 50, 14, "drizzle"]);
egyptWeatherMap.set("Sydney", [24, 60, 16, "cloudy"]);
egyptWeatherMap.set("Dubai", [40, 30, 12, "clear"]);
egyptWeatherMap.set("Mexico City", [20, 65, 10, "drizzle"]);
egyptWeatherMap.set("Istanbul", [29, 70, 18, "Clear"]);
egyptWeatherMap.set("Toronto", [22, 68, 14, "drizzle"]);
egyptWeatherMap.set("Beijing", [28, 75, 20, "clear"]);
egyptWeatherMap.set("Buenos Aires", [19, 70, 15, "Cloudy"]);
egyptWeatherMap.set("Berlin", [17, 80, 10, "Rain"]);
egyptWeatherMap.set("Madrid", [30, 50, 12, "clear"]);
egyptWeatherMap.set("Seoul", [27, 75, 14, "cloudy"]);
egyptWeatherMap.set("Jakarta", [31, 85, 20, "clear"]);
egyptWeatherMap.set("Bangkok", [34, 80, 15, "clear"]);
egyptWeatherMap.set("Lagos", [29, 85, 12, "clear"]);
egyptWeatherMap.set("Tehran", [33, 40, 18, "clear"]);
egyptWeatherMap.set("Riyadh", [38, 25, 20, "clear"]);

// sources of weather statue imgs
let cloudImgSrc = "./imgs/weather-app-img/images/clouds.png";
let clearImgSrc = "./imgs/weather-app-img/images/clear.png";
let snowImgSrc = "./imgs/weather-app-img/images/snow.png";
let drizzleImgSrc = "./imgs/weather-app-img/images/drizzle.png";
let rainImgSrc = "./imgs/weather-app-img/images/rain.png";

// search process

let icon = document.querySelector(".icon"); // search icon
let searchInput = document.querySelector(".search input"); // search input field
let weatherStatue = document.querySelector(".weather-img img"); // weather statue img
let degree = document.querySelector(".degree span"); // degree
let city = document.querySelector(".city"); // city
let humidity = document.querySelector(".humidity span"); // humidity value
let wind = document.querySelector(".wind span"); // wind speed value
let reuslts = document.querySelector(".results"); // search results container


// on clicking search icon
icon.onclick = () => {
    // get searched value
    let searchedCity = searchInput.value;
    // capitlize searched value
    searchedCity = searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1).toLowerCase();
    
    // handle if city consists of 2 words
    let arr = searchedCity.split(" ");
    if(arr.length > 1) {
        arr[1] = arr[1][0].toUpperCase() + arr[1].slice(1).toLowerCase();
        searchedCity = arr[0] + " " + arr[1];
    }

    // if searched city is right
    if(egyptWeatherMap.has(searchedCity)) {
        // make city = searched value
        city.textContent = searchedCity;
        // change degree val
        degree.textContent = egyptWeatherMap.get(searchedCity)[0];
        // change humidity val
        humidity.textContent = egyptWeatherMap.get(searchedCity)[1];
        // change wind speed val
        wind.textContent = egyptWeatherMap.get(searchedCity)[2];
        // change statue img
        let statue = egyptWeatherMap.get(searchedCity)[3];
        statue = statue.toLowerCase();
        if(statue == "clear") {
            weatherStatue.src = clearImgSrc;
        }
        else if(statue == "cloudy") {
            weatherStatue.src = cloudImgSrc;
        }
        else if(statue == "drizzle") {
            weatherStatue.src = drizzleImgSrc;
        }
        else if(statue == "rain") {
            weatherStatue.src = rainImgSrc;
        }
        else if(statue == "snow") {
            weatherStatue.src = snowImgSrc;
        }
    }
    // hide search menu after searching
    let reuslts = document.querySelector(".results");
    reuslts.style.display = "none";
}

// search when user click enter
window.onkeydown = e => {
    if(e.key == "Enter") {
        icon.click();
    }
}

// show search results

// search map to know if city has been showen before or not
let searchMap = new Map();

searchInput.oninput = () => {
    
    // select searched val and capitlize it
    let searched = searchInput.value;
    searched = searched.charAt(0).toUpperCase() + searched.slice(1).toLowerCase();
    
    // select results container and results
    let vals = document.querySelectorAll(".k");


    // if searched val is not empty
    if(searched != '') {
        
        // search in map keys to get searched val result
        for(let key of egyptWeatherMap.keys()) {
            // if key == searched val and hasn't shown before
            if(key.startsWith(searched) && searchMap[key] != 1) {
                // show results
                reuslts.style.display = "flex";

                // make div of searched city and show it
                let keyContainer = document.createElement("div");
                keyContainer.textContent = `${key}`;
                keyContainer.classList.add("k");
                reuslts.appendChild(keyContainer);

                // flag this city as shown before
                searchMap[key] = 1;
            } 
            // if searched val is not exist 
            // remove all searched vals
            else if(!key.startsWith(searched)) {
                // flag city as not searched
                searchMap[key] = 0;
                // remove shown vals
                vals.forEach((e) => {
                    if(e.textContent == key) {
                        e.remove();
                    }
                });
            }
        }
        
        // handle searching by clicking on search result in search menu
        vals = document.querySelectorAll(".k");
        vals.forEach(e => {
            e.onclick = () => {
                searchInput.value = e.textContent;
                icon.click();
                reuslts.style.display = "none";
            }
        });

        // handle shown results click and hover with mouse and keyboard
        let idx = -1;
        window.onkeydown = e => {
            if(e.key == "ArrowDown" && idx < vals.length) {
                e.preventDefault();
                idx++;
                vals[idx].classList.add("hoverd");
                searchInput.value = vals[idx].textContent;
                if(idx > 0) vals[idx - 1].classList.remove("hoverd");
            }
            if(e.key == "ArrowUp" && idx > 0) {
                e.preventDefault();
                idx--;
                vals[idx].classList.add("hoverd");
                searchInput.value = vals[idx].textContent;
                if(idx < vals.length - 1) vals[idx + 1].classList.remove("hoverd");
            }
            if(e.key == "Enter") {
                icon.click();
                reuslts.style.display = "none";
                searchInput.blur();
            }
        }

    }
    // if search is empty
    else {
        // hide results
        reuslts.style.display = "none";
        vals.forEach((e) => {
            e.remove();
        });
        // make new search map
        searchMap = new Map();
    }

}
