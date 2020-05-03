const loadStart = () => {


		let body = document.querySelector("body"); 
		let form = document.querySelector(".form");
		let results = document.querySelector(".results");

		console.log(form);
		

		/* Background */

		body.classList.remove("bgLoading", "bgLoadComplete");
		form.classList.remove("formOff", "formOn");


		body.classList.add("bgLoading");

		let circles = document.querySelectorAll(".circles li");
		
		for (let circle of circles) {

				circle.style.animationDuration = "2s";

		}

		/* Form */

		form.classList.add("formOff");

		/* Results */

}

const loadEnd = () => {

		/* Background */

		let body = document.querySelector("body"); 
		let form = document.querySelector(".form");
		let results = document.querySelector(".results");

		body.classList.add("bgLoadComplete");
						
		let circles = document.querySelectorAll(".circles li");
				
		for (let circle of circles) {

				circle.style.animationDuration = "25s";

		}
	
		/* Form */

		/* Results */

		results.classList.add("resultsOn");

}

export { loadStart, loadEnd }