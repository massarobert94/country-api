

// Changed from FormData API to handling selected values

function handleSubmit(){
    let select = document.getElementById('countryInput');
    let country = select.options[select.selectedIndex].value;
    
    console.log(country);

const url = `https://restcountries.com/v3.1/name/${country}`;
console.log(url);

// Get country data for the given coordinates, send it to HTML
const countryRequest = async (method, url) => {
    let response = await fetch(url);
    let countryData = await response.json();
    return countryData;
}
// Gets current country data, displays in HTML.
const getCurrentData = async () => {
    countryRequest('GET', url)
        .then(res => {
            console.log(res);

            // Coat of arms as top photo
            const coatOfArms = document.getElementById('coatOfArms');
            coatOfArms.src = res[0].coatOfArms.png;
            console.log(res[0].coatOfArms.png);

            // Flag as middle photo

            const flag = document.getElementById('flagImg');
            flag.src = res[0].flags.png;

            // Card title & flag emoji

            const cardTitle = document.getElementById('card-title');
            cardTitle.innerHTML = `${res[0].name.official} ${res[0].flag}`;

            // Region
            
            const region = document.getElementById('region');
            const regionData = res[0].subregion;
            region.innerHTML = regionData;

            // Capital City & latitude / longitude

            const capital = document.getElementById('capital');
            capital.innerHTML = res[0].capital[0];
            const latitude = res[0].capitalInfo.latlng[0];
            const longitude = res[0].capitalInfo.latlng[1];
            console.log(latitude);
            console.log(longitude);
            
            // Weather functions: would like to import/export or use modules at some point

            const apiKey = config.WEATHER_KEY;
            // const units = (putImperialHere.checked == true) ? 'imperial' : 'metric';
            const units = 'metric';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly&appid=${apiKey}`;

            const requestWeather = async(method, weatherUrl) => {
            let response = await fetch(weatherUrl);
            let weatherData = await response.json();
            console.log(weatherData);
            return weatherData;
            }       

            const getWeatherData = async () => {
            requestWeather('GET', weatherUrl)
                .then(weatherData =>{

                const weather = document.getElementById('weather');
                const weatherIcon = document.getElementById('weatherIcon');

                weather.innerHTML = Math.round(weatherData.current.temp) + '° C';
                weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;
                })
            }
            getWeatherData();

            // Embed Google Maps using country variable and Maps Embed API

            let mapsDiv = document.getElementById('mapsDiv');
            const mapsApiKey = config.MAPS_KEY;
            let mapsHtml = `<iframe
            width="502"
            height="450"
            style="border:0; border-radius:10px"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}
            &q=${country}">
            </iframe>`
            mapsDiv.innerHTML = mapsHtml;
            // console.log(mapsHtml);

            // console.log(weatherData);



            // Languages array

            const langList = document.getElementById('languagesList');
            langList.innerHTML = "";
            const languagesArray = res[0].languages;
            // console.log(languagesArray);
            for(const [key, value] of Object.entries(languagesArray)) {
                let li = document.createElement('li');
                li.innerText = `${key}: ${value}`;
                langList.appendChild(li);
            }

            // Borders array

            const borderList = document.getElementById('borderList');
            borderList.innerHTML = "";
            const bordersArray = res[0].borders;
            for(const [key, value] of Object.entries(bordersArray)) {
                let li = document.createElement('li');
                li.innerText = `${value}`;
                borderList.appendChild(li);
            }
        })
}

getCurrentData();
}
// Event listener to grab data for U.S.A. when page loads. Second Event Listener grabs data when the select field is changed.

window.addEventListener('load', handleSubmit);
countryInput.addEventListener('change', handleSubmit);


