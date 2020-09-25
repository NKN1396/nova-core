import fetch from "node-fetch"
import { isEmpty } from "lodash"
import AbortController from "abort-controller"

const worldstateUrl = "https://content.warframe.com/dynamic/worldState.php"
const worldstateResolveTime = 150	//Make sure a call for worldstate always resolves within 150ms (or less)
const fetchTimeoutTime = 10000	//TTL of ongoing fetch requests (only one at a time)

let cachedWorldstate = {}
let timestampNextFetch = 0
let currentRequest = null

//Actually fetches the worldstate from DEs website. Should only be called once at a time.
async function fetchWorldstate() {
	//Check if there's already a fetch going on
	if(currentRequest !== null) { return }
	//No other fetch job has been queued yet, proceeding..

	//Set timeout for fetch request
	const controller = new AbortController()
	const timeout = setTimeout(
		() => { controller.abort() },
		fetchTimeoutTime,
	)
	
	await fetch(worldstateUrl, { signal: controller.signal })
		.then(response => response.json())
		.then(json => {
			timestampNextFetch = Date.now() + 60000	//60s * 1000ms/s = 1 minute
			cachedWorldstate = json
		})
		.catch(error => {
			//Could not fetch new worldstate
			console.log(error)
		})
	clearTimeout(timeout)	//Tell AbortController that nothing needs to be done anymore
	
	//Clear fetching state
	currentRequest = null
}


export default async function() {
	if(Date.now() < timestampNextFetch) {
		//Worldstate less than a minute old
		//Return cached worldstate
		return cachedWorldstate
	}
	
	//Worldstate older than a minute, attempt to fetch new one
	const timeout = setTimeout(
		() => { return cachedWorldstate },
		worldstateResolveTime,
	)

	if(currentRequest === null){
		currentRequest = fetchWorldstate()
	}
	await currentRequest

	clearTimeout(timeout)
	if(isEmpty(cachedWorldstate) === true)
	{
		throw new Error("No valid worldstate has been cached yet.")
	}
	return cachedWorldstate
}
