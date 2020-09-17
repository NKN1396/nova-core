import Commando from "discord.js-commando"
const { CommandoClient } = Commando

const bot = new CommandoClient()

//require("./index")(bot)


import wiki from "./utils/searchWiki.js"
import worldstate2 from "./utils/worldstate.js"

worldstate2()
	.then(r=>{
		console.log(r)
	})

/*wiki("Nova Prime")
	.then(r => console.log(r))
	.catch(console.error)
*/

export default function(){console.log("lol")}
