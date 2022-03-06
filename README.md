# country-api

Country is chosen from dropdown, which is sent to Rest Countries API returning a variety of data and interesting info about the country including latitude and longitude of the country's capital city. Those coordinates are then sent to Open Weather API returning current weather data for the city. Then, we use the country name as part of an API call to Maps Embed which returns an iframe of a map of the country

You'll need to get an API key for Google Maps API and for Open Weather API.

Create a file called "config.js".
Create an object called config like so:
var config = { WEATHER_KEY: 'YOUR OPEN WEATHER API KEY HERE', MAPS_KEY: 'YOUR MAPS EMBED API KEY HERE' }
