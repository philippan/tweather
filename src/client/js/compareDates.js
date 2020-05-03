const compareDates = (now, departureDate) => {

		let daysApart = (departureDate-now)/86400000;

		console.log(daysApart);

		return daysApart;

}

export { compareDates };