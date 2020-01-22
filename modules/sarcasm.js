/**
 * Points out obvious sarcasm. Triggered by ending a message with "/s".
 * @param {*} client The Discord.js client to hook into.
 */
module.exports = function(client){
	client.on("message", message => {

		if(
			!message.content.toLowerCase().endsWith(" /s") &&
			message.content !== "/s"
		) return

		message.channel.send("*(That was sarcasm)*")
			.catch(console.error)

	})
}
