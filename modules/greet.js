const makeshift = require("./../resources/makeshift.json")

/**
 * Sends a welcome message in #general.
 * @param {*} client The bot client.
 */
module.exports = function(client){
	client.on("guildMemberAdd", async guildMember => {

		//Check if member joined Makeshift guild
		if(guildMember.guild.id !== makeshift.guild) return

		await client.channels.get(makeshift.channels.text.general).send(`Welcome to the Makeshift clan Discord, ${guildMember.user}!`)
			.catch(console.error)
		client.emit("guildMemberGreeted", guildMember)

	})
}
