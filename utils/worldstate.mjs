import fetch from "node-fetch"

const worldstateUrl = "https://content.warframe.com/dynamic/worldState.php"

var cachedWorldstate = {}
var timestampNextFetch = 0

export default function() {
	return new Promise(async (resolve, reject) => {
		if(Date.now() < timestampNextFetch) {
			//Worldstate less than a minute old
			//Return cached worldstate
			resolve(cachedWorldstate)
		}
		
		//Worldstate older than a minute
		//Attempt to fetch new one
		fetch(worldstateUrl)
			.then(response => {
				timestampNextFetch = Date.now() + 60000	//60s * 1000ms/s = 1 minute
				cachedWorldstate = response.json()
				resolve(cachedWorldstate)
			})
			.catch(error => {
				console.log(error)
				if(Object.keys(cachedWorldstate).length === 0
					&& cachedWorldstate.constructor === Object)
				{
					reject("No valid worldstate has been cached yet.")
				}
				resolve(cachedWorldstate)
			})
	})
}
