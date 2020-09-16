let worldstateUrl = "https://content.warframe.com/dynamic/worldState.php"
const fetch = require("node-fetch")

var lastResponse = {}
var timestampNextFetch = 0

module.exports = function() {
	return new Promise((resolve, reject) => {
		if(Date.now() < timestampNextFetch) {
			//Worldstate less than a minute old
			//Return cached worldstate
			resolve(lastResponse)
		}
		//Worldstate older than a minute
		//Attempt to fetch new one
		fetch(worldstateUrl)
			.then(response => {
				timestampNextFetch = Date.now() + 60000	//60s * 1000ms/s = 1 minute
				lastResponse = response.json()
				resolve(lastResponse)
			})
			.catch(error => {
				reject(error)
			})
	})
}
