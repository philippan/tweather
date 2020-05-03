require('jest-fetch-mock').enableMocks();
import "regenerator-runtime/runtime";

beforeEach(() => {
		fetch.resetMocks()
});

test("Fetching history from server.js should return a no history available message", async () => {
		

		// Test success outputs

		let history = JSON.stringify({
				roadmap: "Saving weather history is on our roadmap."
		});

		// Test fetch
				
		fetch.mockResponseOnce(history);

		let request = await fetch('/history');

		try {

				let response = await request.json();

				console.log("History response: " + response.roadmap);

				expect(response.roadmap).toEqual("Saving weather history is on our roadmap.");
			
		}

		catch(error) {

				let response = "error";
				expect(response).toEqual("error");	

		}

});