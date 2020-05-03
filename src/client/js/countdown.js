import { compareDates } from './compareDates.js';

const countdown = (now, departureDate, nickname, locale) => {

let daysApart = compareDates(now, departureDate);

let displayCountdown = document.getElementById("countdown");

		if (daysApart > 1) {
		
				daysApart = Math.round(daysApart);
				displayCountdown.innerHTML = `
						<h4>Countdown</h4>
						<p>Your trip to ${locale} starts in ${daysApart} days</p>
				`;
		}

		else if (daysApart >= 1 && daysApart <= 1.5) {
		
				displayCountdown.innerHTML = `
						<p>Your trip to ${locale} starts tomorrow</p>
				`;
		}

		else if (daysApart < 1 && daysApart > -1) {
		
				console.log("Countdown: " + daysApart);

				displayCountdown.innerHTML = `
						<h4>Countdown</h4>
						<p>Your trip to ${locale} is today</p>
				`;

		}

		else if (daysApart <= -1) {
		
				displayCountdown.innerHTML = `
						<h4>Countdown</h4>
						<p>Reminiscing about a trip to ${locale}?</p>
				`;
		}

		else {

				displayCountdown.style.display = "none";

		}

}

export { countdown };