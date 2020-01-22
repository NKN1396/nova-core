//Config
const trigger = "Nova,".toLowerCase()

//Dependencies
var { sample } = require("lodash")

/**
 * Makes Nova respond with sassy comments after being asked a question.
 * @param {*} client The bot client.
 */
module.exports = function(client){
	client.on("message", async message => {

		if(!message.content.toLowerCase().startsWith(trigger)) return

		message.channel.send(pickAnswer(message))
			.catch(console.error)

	})
}

/**
 * Picks a sassy response for Nova.
 * @param {*} message The message to respond to.
 * @returns {String} The response.
 */
function pickAnswer(message){
	let bNsfw = message.channel.nsfw

	//Appropriate response to Zephyr
	if(message.content.toLowerCase().match("zephyr")) return `Zephyr is a useless piece of ${bNsfw?"shit":"junk"}, stop asking.`

	//Randomized answers
	let nRandom = Math.random()
	//LEGENDARY
	if((nRandom*1000)<1) return (`Love you, ${message.author} 😘`)
	//RARE
	if((nRandom*15)<1){
		let responses = [
			"My answer-module broke. Could you ask me again?",
			"Oh my gosh.. 🙄",
			"¯\\\\_(ツ)\\_/¯",
			bNsfw?"Are you retarded?":"Are you okay?",
			"Ask me later",
			"Try again",
			"Don't annoy me",
			"Alright 🙄",
			"You sound like a Limbo-main.",
			bNsfw?"Fuck off.":"..."
		]
		return sample(responses)
	}
	//UNCOMMON
	if((nRandom*5)<1){
		let responses = [
			"Not sure",
			"Dunno",
			"WTF?",
			"ಠ_ಠ",
			"Uuuuhhhh~",
			"K",
			"Forget it",
			"._.",
			"Okay",
			"N-No!",
		]
		return sample(responses)
	}
	//COMMON
	let responses = [
		"Certainly",
		"Yeah",
		"Most likely",
		"Yes",
		"NO!",
		"(☞ﾟヮﾟ)☞           No",
		"Nah",
		"Nope",
		"Doubt it",
		"Nuh-uh~",
		"No.",
		"Never ever",
		"No",
		"How about no?",
		"Absolutely",
		"Why not?",
		"Not really",
		"Negative.",
		"No way!",
		"Absolutely... **NOT!**",
		"👎",
		"👍",
		"Definitely",
		"No?",
		"No Thanks!",
		"Not on my watch",
		"**NEIN!**"
	]
	return sample(responses)
}
