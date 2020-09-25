import Commando from "discord.js-commando"
const { CommandoClient } = Commando

const bot = new CommandoClient()

//require("./index")(bot)


import wiki from "./utils/searchWiki.js"
import worldstate2 from "./utils/worldstate.js"

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
} 

(async()=>{
	worldstate2()
	worldstate2()
	await sleep(1000)
	worldstate2()
	await sleep(10000)
	worldstate2()
	await sleep(50000)
	worldstate2()
})()


/*wiki("Nova Prime")
	.then(r => console.log(r))
	.catch(console.error)
*/

export default function(){console.log("lol")}
