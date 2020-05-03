import { displayError } from './displayError.js';


const getCast = (daysApart, departureDisplay) => {

		if (daysApart < 1 && daysApart > -1) {

				return "Current";	

		}

		else if (daysApart > 7) {

				return "Forecast";			

		}

		else {

				return departureDisplay;

		}


}

const displayWeather = (countrySuccess, daysApart, departureDisplay, obTime, temp, precip, clouds, country, countryName, countryCapital, countryCurrency, countryLanguage) => {

		let displayWeather = document.getElementById("weather");
		let displayCountryInfo = document.getElementById("countryInfo");

		/* Define cast */

		let cast = getCast(daysApart, departureDisplay);


		if (countrySuccess == "success") {

		/* Display */

				displayWeather.innerHTML = `
					
						<div class="item1">
								<h1>${temp}&#730;</h1>
								<p id="cast">${cast}</p>
						</div>

						<div class="weatherDetails">
								
								<div class="item2">
										<h4>Percipitation</h4>
										<p>${precip}&percnt;</p>
								</div>

								<div class="item3">
										<h4>Clouds</h4>
										<p>${clouds}&percnt;</p>
								</div>

								<div class="item4">
										<h4>Observed</h4>
										<p>${obTime}</p>
								</div>

						</div>

				`;

				displayCountryInfo.innerHTML = `
						<h4>About destination country</h4>
						<p><span class="bold">Official name:</span> ${countryName}<p/>
						<p><span class="bold">Capital:</span> ${countryCapital}<p/>
						<p><span class="bold">Currency:</span> ${countryCurrency}<p/>
						<p><span class="bold">Language:</span> ${countryLanguage}<p/>
				`;

		}

		else {


				displayWeather.innerHTML = `
					
						<div class="item1">
								<h1>${temp}&#730;</h1>
								<p id="cast">${cast}</p>
						</div>

						<div class="weatherDetails">
								
								<div class="item2">
										<h4>Percipitation</h4>
										<p>${precip}&percnt;</p>
								</div>

								<div class="item3">
										<h4>Clouds</h4>
										<p>${clouds}&percnt;</p>
								</div>

								<div class="item4">
										<h4>Observed</h4>
										<p>${obTime}</p>
								</div>

						</div>

				`;

				displayCountryInfo.innerHTML = `
						<h4>About destination country</h4>
						<p>No info on ${country} available</p>
				`;

		}

}

export { displayWeather };