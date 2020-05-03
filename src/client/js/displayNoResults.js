const displayNoResults = (countrySuccess, country, countryName, countryCapital, countryCurrency, countryLanguage, pixaResponse) => {

		let displayWeather = document.getElementById("weather");
		let displayCountryInfo = document.getElementById("countryInfo");

		displayWeather.innerHTML = `
				<p class="noWeather">No weather for your destination</p>
				<img class="pixaImage" src="${pixaResponse}" alt="country photo">
				
		`;


		if (countrySuccess == "success") {

				displayCountryInfo.innerHTML = `
						<h4>About destination country</h4>
						<p><span class="bold">Official name:</span> ${countryName}<p/>
						<p><span class="bold">Capital:</span> ${countryCapital}<p/>
						<p><span class="bold">Currency:</span> ${countryCurrency}<p/>
						<p><span class="bold">Language:</span> ${countryLanguage}<p/>
				`;

		}

		else {

				displayCountryInfo.innerHTML = `
				
						<h4>About destination country</h4>
						<p>No info on ${country} available</p>
				
				`;
		}

}

export { displayNoResults };