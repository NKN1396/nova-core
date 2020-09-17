import fetch from "node-fetch"
import _ from "lodash"
const { isEmpty } = _

const worldstateUrl = "https://content.warframe.com/dynamic/worldState.php"

let cachedWorldstate = {}
let timestampNextFetch = 0

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
			.then(response => response.json())
			.then(json => {
				timestampNextFetch = Date.now() + 60000	//60s * 1000ms/s = 1 minute
				cachedWorldstate = json
				resolve(cachedWorldstate)
			})
			.catch(error => {
				console.log(error)
				if(isEmpty(cachedWorldstate) === false)
				{
					reject("No valid worldstate has been cached yet.")
				}
				resolve(cachedWorldstate)
			})
	})
}
