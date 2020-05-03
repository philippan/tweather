const regeneratorRuntime = require("regenerator-runtime");
const now = new Date(); 
const userSubmit = document.getElementById("userSubmit"); 
const userReset = document.getElementById("userReset"); 
const obscureLocation = document.getElementById("getObscure"); 


import { getInput } from './getInput.js';
import { getCoordinates, getWeather, getCountryInfo, getPicture } from '../index.js';
import { compareDates } from './compareDates.js';
import { countdown } from './countdown.js';
import { displayWeather } from './displayWeather.js';
import { displayNoResults } from './displayNoResults.js';
import { loadStart, loadEnd } from './loadTransition.js';
import { appReset } from './appReset.js';
import { getObscure } from './getObscure.js';
import { displayError } from './displayError.js';

import  '../styles/index.scss';

// serviceWorker

if ('serviceWorker' in navigator) {
		
		window.addEventListener('load', () => {
		
				navigator.serviceWorker.register('/service-worker.js').then(registration => {
		
						console.log('SW registered: ', registration);
			
				}).catch(registrationError => {
		
						console.log('SW registration failed: ', registrationError);
		
				});

		});
}


// APP FUNCTION

const appResponse = async () => {

		let [street, city, state, country, departureDay, departureMonth, departureYear, departureDate, departureDisplay] = await getInput();

		console.log("App entered: " + street + " " + city + " " + state + " " + country);

		loadStart();
	
		let daysApart = await compareDates(now, departureDate);

		let [latitude, longitude, nickname, locale] = await getCoordinates(street, city, state, country);

		let [weatherSuccess, obTime, temp, precip, clouds, countryCode] = await getWeather(latitude, longitude, departureDate, daysApart);

		let [countrySuccess, countryName, countryCapital, countryCurrency, countryLanguage] = await getCountryInfo(countryCode, country);
			
		console.log("Weather Success: " + weatherSuccess);
		console.log("Country Success: " + countrySuccess);

		
		if (weatherSuccess == "success") {
				

				displayWeather(countrySuccess, daysApart, departureDisplay, obTime, temp, precip, clouds, country, countryName, countryCapital, countryCurrency, countryLanguage);
				
				countdown(now, departureDate, nickname, locale);

				loadEnd();


		}


		else if (weatherSuccess == "fail" && countrySuccess == "success") {

								
				let pixaResponse = await getPicture(countryName);
				
				displayNoResults(countrySuccess, country, countryName, countryCapital, countryCurrency, countryLanguage, pixaResponse);

				countdown(now, departureDate, nickname, locale);

				loadEnd();


		}  


		else if (weatherSuccess == "fail" && countrySuccess == "fail") {


				displayError();

				let displayCountdown = document.getElementById("countdown");
				
				displayCountdown.style.display = "none";


				loadEnd();

		}
				
		
}


// EVENT LISTENERS


// ----- Click Get Weather button

userSubmit.addEventListener("click", appResponse);


// ----- Keyup Get Weather fields

document.querySelectorAll('.userInput').forEach(item => {

		item.addEventListener('keyup', event => {

				if (event.keyCode === 13) {
						event.preventDefault();
						appResponse();
				}
		})

});

// ----- Click to Reset button

userReset.addEventListener("click", appReset);


// ---- Click Give me an obscure location

obscureLocation.addEventListener("click", getObscure);