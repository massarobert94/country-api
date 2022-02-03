

// FormData API

function handleSubmit(event){
    event.preventDefault();

    
    const data = new FormData(event.target);
    const country = data.get('countryInput');
    
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

                weather.innerHTML = Math.round(weatherData.current.temp); + '°';
                weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;
                })
            }
            getWeatherData();

            // console.log(weatherData);



            // Languages array --- NEED TO CLEAR ARRAY BEFORE NEW SEARCH

            const langList = document.getElementById('languagesList');
            const languagesArray = res[0].languages;
            // console.log(languagesArray);
            for(const [key, value] of Object.entries(languagesArray)) {
                let li = document.createElement('li');
                li.innerText = `${key}: ${value}`;
                langList.appendChild(li);
            }

            // Borders array - similar to one above, will likely need to reset before executing another search

            const borderList = document.getElementById('borderList');
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
// Event listener for button submission

countryForm.addEventListener('submit', handleSubmit);


