//External dependencies
const commando = require("discord.js-commando")
const discordErrorHandler = require("discord.js-handles")

module.exports = function(token, handlerOptions) {

	console.log("Bot initialization started")

	//Create new Discord client
	const bot = new commando.Client({
		commandPrefix : "!",
		unknownCommandResponse : false,
		owner : "153595272465743872"
	})

	//Initialize bot error handling
	discordErrorHandler(bot, handlerOptions)
	
	//Load custom features
	//require("./src/modules/index")(bot)

	//Load and register commands.
	//require("./commands/index")(bot)

	//Start bot
	bot.login(token)
		.catch(console.error)

	//Set Status
	bot
		.on("ready", () => {
			setBotStatus(bot.user)
		})
		.on("resume", ()=> {
			setBotStatus(bot.user)
		})
	
	return bot
}

//Set bot status
function setBotStatus(user){
	user.setPresence({
		activity: {
			name: "@Nova help",
			type: 0
		}
	})
}
