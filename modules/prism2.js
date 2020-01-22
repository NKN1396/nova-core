var { sample } = require("lodash")

const makeshift = require("./../resources/makeshift.json")

/**
 * Assigns a random color after joining the Makeshift guild.
 * @param {*} client The bot client.
 */
module.exports = function(client){
	client.on("guildMemberGreeted", guildMember => {

		//Check if member joined Makeshift guild
		if(guildMember.guild.id !== makeshift.guild) return

		guildMember.roles.add(sample(makeshift.roles.colors))
			.catch(console.error)

	})
}
