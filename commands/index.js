const path = require("path")

/**
 * Handles registration and loading of Novas commands.
 * @param {Object} client The CommandoClient to register the commands in.
 */
module.exports = function(client) {
	console.log("nova-core: attempting to load commands")
	client.registry
		.registerGroups([
			["developer", "Developer"],
			["warframe", "Warframe Resources"],
			["other", "Other"]
		])
		.registerDefaultGroups()
		.registerDefaultTypes()
		.registerCommandsIn(path.join(__dirname))
		.registerDefaultCommands(
			{
				"help" : true,
				"prefix" : false,
				"eval_" : true,
				"ping" : false,
				"commandState" : false,
				"unknownCommand": false
			}
		)
	console.log("nova-core: commands loaded")
}
