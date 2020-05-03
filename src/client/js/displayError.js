const displayError = () => {

		let displayWeather = document.getElementById("weather");
		let displayCountryInfo = document.getElementById("countryInfo");

		displayWeather.innerHTML = `<p class="displayError">Something went wrong...</p>`;
		displayCountryInfo.style.display = "none";

		console.log("Something went wrong");
}

export { displayError };