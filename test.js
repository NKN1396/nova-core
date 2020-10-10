import Commando from 'discord.js-commando'

// const bot = new CommandoClient()

// require("./index")(bot)

import wiki from './utils/searchWiki/index.js'
import worldstate2 from './utils/worldstate.js'
const { CommandoClient } = Commando
/*
(async()=>{
  wiki("Ember Prime")
})()
*/

(async () => {
  const ws = ['Prisma Grakata', 'Ember Prime', 'Nova Prime', 'Noba Prime', 'Noba Pime']
  for (const w of ws) {
    await wiki(w)
      .catch(console.error)
  }
})()

export default function () { console.log('lol') }
