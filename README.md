# Tweather App

This application was created for Udacity's Front End Development Nanodegree project. It takes user destination and departure input and returns the weather for that location and place, as well as trivia about the country. Per requirements the application relies on the geonames, weatherbit, restcountries, and pixabay APIs.

## APIs

The main challenge was to pass data from one API to collect the right fields.

Particular to the assignment was the fact that weatherbit (originally Dark Sky) had to receive coordinates rather than the destination address to get the weather. To do this the app began sending address information to geonames to get the coordinates.

```
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

```

While weatherbit could product the weather with the coordinates, it did not have trivia information on the destination country. This information had to be obtained from restcountries. 

```
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

```

The app uses the country code obtained from weather bit to fetch data from restcountries. But if that's unavailable, the app relies on the user's country name.

```
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

```




## pixabay API

As a stretch goal, I opted to pull an image from pixabay for the destination country, when the weatherbit produced no results. The most difficult part of this task was laying out the different combinations for when a user has weather information, country information, both, or neither. Because of this, it was useful to break out the pixabay fetch from the weatherbit fetch into their own functions in order to mirror the combinations. 

```
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
});
```

## pixabay API

For testing I relied on JEST. Testing was a challenge because most of the app involved calling external sources. To address this, I relied on jest-fetch-mock to provide a responses for where fetches were called.

```
// Test values

				process.env.WEATHERBIT_KEY = "6a3adea572ec42508d740188ade861b3";

				let latitude = 30;
				let longitude = 30;
				let departureDate = new Date(2020,6,14);
				let daysApart = 2;		// Days apart is within 7 days = current weather


				// Test success outputs

				const definedWeather = JSON.stringify({
						data: [{ob_time: 30, temp: 30, precip: 30, clouds: 30, country_code:"AU" }, "More..."],
						country_code: "AU" 
				});

				// Test fetc
				
				fetch.mockResponseOnce(definedWeather);


				// Test

				let [weatherSuccess, obTime, temp, precip, clouds, countryCode] = await getWeather(latitude, longitude, departureDate, daysApart);

				console.log("weather success in jest: " + weatherSuccess);


				expect(weatherSuccess).toEqual("success");
				expect(obTime).toEqual(30);
				expect(temp).toEqual(86);
				expect(precip).toEqual(30);
				expect(clouds).toEqual(30);
				expect(countryCode).toEqual("AU");
```