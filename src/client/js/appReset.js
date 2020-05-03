const appReset = () => {

		let form = document.querySelector(".form");
		let results = document.querySelector(".results");

		document.getElementById("city").value = "";
		document.getElementById("state").value ="";
		document.getElementById("country").selectedIndex = 0;
		document.getElementById("day").value = "";
		document.getElementById("month").selectedIndex = 0;
		document.getElementById("year").value = "";

		results.classList.remove("resultsOn");
		form.classList.remove("formOff");
		form.classList.add("formOn");

		window.scrollTo({
        		top: 0,
        		behavior: 'smooth'
    	});

}

export { appReset };