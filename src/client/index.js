const regeneratorRuntime = require("regenerator-runtime");


// -- HELPER FUNCTIONS --- //

const getWeatherURL = async (daysApart, latitude, longitude) => {

		let weatherKey = process.env.WEATHERBIT_KEY;
		let currentURL =`https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${weatherKey}`;
		let forecastURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${weatherKey}`;

		let weatherURL = currentURL;

		if (daysApart >= -7 && daysApart <= 7) {

				weatherURL = currentURL;				
				console.log("Today's weather");

		}

		else if (daysApart > 7) {

				weatherURL = forecastURL;				
				console.log("Forecast");

		}

		else {
			
				weatherURL = currentURL;
				console.log("Historical weather");
		}

		return weatherURL;

}



// -- FETCH API INFORMATION -- //


const getCoordinates = async (street, city, state, country) => {

		let geoUsername = process.env.GEONAMES_USERNAME;
		let baseURL = "https://secure.geonames.org/geoCodeAddressJSON?q=";

		let requestConfig = await fetch(`${baseURL}${street}+${city}+${state}+${country}&username=${geoUsername}`);

				try {

						const geoResponse = await requestConfig.json();
						
						console.log(geoResponse.address.lat);
						console.log(geoResponse.address.lng);
						console.log(geoResponse.address.postalcode + " " + "Postal Code");
						console.log(geoResponse.address.adminName1);
						console.log(geoResponse.address.locality);
						
						let latitude = geoResponse.address.lat;
						let longitude = geoResponse.address.lng;
						let postalCode = geoResponse.address.postalcode;
						let nickname = geoResponse.address.adminName1;
						let locale = geoResponse.address.locality;

						return [latitude, longitude, nickname, locale];

				}

				catch (error) {

						let latitude = ""; 
						let longitude = "";
						let nickname = ""
						let locale = "";

						console.log("Couldn't get response from geonames: ", error);
						console.log(requestConfig);

						return [latitude, longitude, nickname, locale];

				}

}

const getWeather = async (latitude, longitude, departureDate, daysApart) => {

		console.log("Values for JEST testing: " + latitude + " " + longitude + " " + departureDate + " " + daysApart);

		let weatherURL = await getWeatherURL(daysApart, latitude, longitude);

		console.log(weatherURL);
		
		let requestConfig = await fetch(weatherURL);

			try {

					const weatherResponse = await requestConfig.json();
					
					/*
					console.log(daysApart);
					console.log(weatherResponse);
					console.log(weatherResponse.country_code);
					console.log(weatherResponse.data);
					console.log(weatherResponse.data[0]);
					console.log(weatherResponse.data[0].country_code);
					console.log(weatherResponse.data[1]);
					*/

					let weatherSuccess = "success";
					let obTime = weatherResponse.data[0].ob_time;
					let celsius = weatherResponse.data[0].temp;
					let faren = celsius * (9 / 5) + 32;
					let temp = Math.round(faren);
					let precip = Math.round(weatherResponse.data[0].precip);
					let clouds = Math.round(weatherResponse.data[0].clouds); 
					let countryCode = false;

					if (daysApart > 7) {

							countryCode = weatherResponse.country_code;

					}

					else {

							countryCode = weatherResponse.data[0].country_code;
					}

					return [weatherSuccess, obTime, temp, precip, clouds, countryCode];

			}

			catch (error) {

					console.log("Couldn't get a response from weatherbit", error);
					
					console.log(requestConfig);

					let weatherSuccess = "fail";
					let obTime = "";
					let temp = "";
					let precip = "";
					let clouds = "";
					let countryCode = false;

					return [weatherSuccess, obTime, temp, precip, clouds, countryCode];

			}

}

const getCountryInfo = async (countryCode, country) => {

		let codeURL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
		let countryURL = `https://restcountries.eu/rest/v2/name/${country}`;
		
		let fetchURL = codeURL;
		let restjson = "code";

		if (countryCode == false || countryCode == undefined || countryCode == "" || countryCode == null || countryCode == NaN) {

				fetchURL = countryURL;
				restjson = "country";

		} 

		console.log(countryCode);
		console.log(country);
		console.log(fetchURL);
		console.log(restjson)

		let requestCountry = await fetch(fetchURL);

		try {

				let countryResponse = await requestCountry.json();

				console.log(countryResponse);

				let countrySuccess = "success";
				let countryName = ""; 
				let countryCapital = "";
				let countryCurrency = "";
				let countryLanguage = "";


				if (restjson == "code") {

						countryName = countryResponse.name;
						countryCapital = countryResponse.capital;
						countryCurrency = countryResponse.currencies[0].name;
						countryLanguage = countryResponse.languages[0].name;
				}

				if (restjson == "country") {

						countryName = countryResponse[0].name;

						console.log("countryName: " + countryName);

						countryCapital = countryResponse[0].capital;
						countryCurrency = countryResponse[0].currencies[0].name;
						countryLanguage = countryResponse[0].languages[0].name;

				}


				return [countrySuccess, countryName, countryCapital, countryCurrency, countryLanguage];

		}

		catch (error) {

				let countrySuccess = "fail";
				let countryName = "";
				let countryCapital = "";
				let countryCurrency = "";
				let countryLanguage ="";

				console.log("Couldn't get a response from restcountries", error);

				return [countrySuccess, countryName, countryCapital, countryCurrency, countryLanguage];

		}

}


const getPicture = async (countryName) => {

	let baseURL = "https://pixabay.com/api/?";
	let pixaKey = process.env.PIXA_KEY;

	console.log(pixaKey);

	let requestConfig = await fetch(`${baseURL}&key=${pixaKey}&q=${countryName}&image_type=photo&order=popular`);

		try {

				const pixaResponse = await requestConfig.json();
				
				let pixaURL = pixaResponse.hits[1].largeImageURL;

				console.log(pixaURL);
				
				return pixaURL;

		}

		catch (error) {

				console.log("Couldn't get response from pixabay", error);
				console.log(requestConfig);

				let failURL = "https://mars.nasa.gov/internal_resources/647";

				return failURL;

		}

}

export { getWeatherURL, getCoordinates, getWeather, getCountryInfo, getPicture };