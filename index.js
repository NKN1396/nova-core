//External dependencies
const discordErrorHandler = require("discord.js-handles")

module.exports = function(client) {

	console.log("nova-core: initializing")

	//Load custom features
	//require("./src/modules/index")(client)

	//Load and register commands.
	require("./commands/index")(client)

	
}
