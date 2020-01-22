const Command = require("../../utils/novaCommand")

module.exports = class extends Command {
	constructor(client) {
		let options = {
			group: "other",
			name: "video",
			aliases: ["webcam", "voice", "broadcast", "hangout", ""],
			description: "Posts a link for the current voice channel that can be used to hold a group video call."
		}
		super(client, options)
	}

	async run(message) {
		if(!message.guild) return
		try {
			if(message.member.voice.channel) {
				await message.channel.send(`<https://discordapp.com/channels/${message.guild.id}/${message.member.voice.channel.id}>`)
				message.react("✅")
			} else {
				await message.channel.send("You're not in a voice channel!")
				message.react("❌")
			}
		} catch (error) {
			console.error(error)
		}
	}
}
