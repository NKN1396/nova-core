const backend = require("./../resources/backend.json")
const makeshift = require("./../resources/makeshift.json")

/**
 * Reacts with "TM" to a message ending with "soon" in order to keep up the soon™ meme.
 * @param {*} bot The bot client.
 */
module.exports = function(bot){
	bot.on("message", message => {

		//Check if message ends with "soon"
		if(!message.content.toLowerCase().endsWith("soon")) return
		//Check if message was issued on a guild
		if(!message.member) return
		//Check if message of guild was Makeshift
		if(message.member.guild.id != makeshift.guild) return

		message.react(message.client.guilds.get(backend.guild).emojis.get(backend.emojis.soontm))
			.catch(console.error)

	})
}
