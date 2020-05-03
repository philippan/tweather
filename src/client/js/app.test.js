require('jest-fetch-mock').enableMocks();
import "regenerator-runtime/runtime";

import { getWeatherURL, getWeather } from '../index.js';


describe ('Testing getting weather data from weatherbit api with a fake fetch', () => { 


		beforeEach(() => {
    			fetch.resetMocks()
  		});


		test("getWeather() should return 'success' if API returns defined values", async() => {
		
				// Set-Reset dotenv keys
				
				const OLD_ENV = process.env;

		  		beforeEach(() => {
		    	
		    			jest.resetModules() // this is important - it clears the cache
		    			process.env = { ...OLD_ENV };
		    			delete process.env.NODE_ENV;
		 		
		 		});

		  		afterEach(() => {
		    	
		    			process.env = OLD_ENV;
		  		
		  		});


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

		});

});