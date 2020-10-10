import fetch from 'node-fetch'
import _ from 'lodash'
import AbortController from 'abort-controller'
const { isEmpty } = _

const worldstateUrl = 'https://content.warframe.com/dynamic/worldState.php'
// Make sure a call for worldstate always resolves within 150ms (or less)
const worldstateResolveTime = 150
// TTL of ongoing fetch requests (only one at a time)
const fetchTimeoutTime = 10000

let cachedWorldstate = {}
let timestampNextFetch = 0
let activeRequest = null

// Actually fetches the worldstate from DEs website. Should only be called once at a time.
async function fetchWorldstate () {
  // Check if there's already a fetch going on
  if (activeRequest !== null) { return }
  // No other fetch job has been queued yet, proceeding..

  // Set timeout for fetch request
  const controller = new AbortController()
  const timeout = setTimeout(
    () => { controller.abort() },
    fetchTimeoutTime
  )

  await fetch(worldstateUrl, { signal: controller.signal })
    .then(response => response.json())
    .then(json => {
      // 60s * 1000ms/s = 1 minute
      timestampNextFetch = Date.now() + 60000
      cachedWorldstate = json
    })
    .catch(error => {
      // Could not fetch new worldstate
      console.log(error)
    })
  // Tell AbortController that nothing needs to be done anymore
  clearTimeout(timeout)

  // Clear fetching state
  activeRequest = null
}

export default async function () {
  if (Date.now() < timestampNextFetch) {
    // Worldstate less than a minute old
    // Return cached worldstate
    return cachedWorldstate
  }

  // Worldstate older than a minute, attempt to fetch new one
  const timeout = setTimeout(
    () => { return cachedWorldstate },
    worldstateResolveTime
  )

  if (activeRequest === null) {
    activeRequest = fetchWorldstate()
  }
  await activeRequest

  clearTimeout(timeout)
  if (isEmpty(cachedWorldstate) === true) {
    throw new Error('No valid worldstate has been cached yet.')
  }
  return cachedWorldstate
}
