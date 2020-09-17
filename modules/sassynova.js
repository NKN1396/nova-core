//Dependencies
import { sample } from "lodash"

//Config
const trigger = /^nova,/i
const responsesRare = [
	"My answer-module broke. Could you ask me again?",
	"Oh my gosh.. 🙄",
	"¯\\\\_(ツ)\\_/¯",
	"Are you okay?",	//"are you retarded" - might be politically incorrect
	"Do you have brain damage?",
	"Ask me later",
	"Try again",
	"Don't annoy me",
	"Alright 🙄",
	"You sound like a Limbo-main.",
	"..."	//"fuck off" - might be too harsh
]
const responsesUncommon = [
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
const responsesCommon = [
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

/**
 * Makes Nova respond with sassy comments after being asked a question.
 * @param {*} client The bot client.
 */
export default function(client){
	client.on("message", async message => {

		if(!message.content.match(trigger)) return

		message.channel.send(pickSassyResponse(message))
			.catch(console.error)

	})
}

/**
 * Picks a sassy response for Nova.
 * @param {*} message The message to respond to.
 * @returns {String} The response.
 */
function pickSassyResponse(message){
	let bNsfw = message.channel.nsfw

	//Appropriate response to Zephyr
	if(message.content.match(/zephyr/i)) return `Zephyr is a useless piece of ${bNsfw?"shit":"junk"}, stop asking.`

	//Randomized answers
	let nRandom = Math.random()
	//LEGENDARY
	if((nRandom*1000)<1) return (`Love you, ${message.author} 😘`)
	//RARE
	if((nRandom*15)<1){
		return sample(responsesRare)
	}
	//UNCOMMON
	if((nRandom*5)<1){
		return sample(responsesUncommon)
	}
	//COMMON
	return sample(responsesCommon)
}
