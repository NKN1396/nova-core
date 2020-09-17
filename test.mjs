import Commando from "discord.js-commando"
const { CommandoClient } = Commando

const bot = new CommandoClient()

//require("./index")(bot)


import wiki from "./utils/searchWiki.mjs"
//import * as worldstate2 from "./utils/worldstate.mjs"

wiki("Nova Prime")
	.then(r => console.log(r))
	.catch(console.error)
