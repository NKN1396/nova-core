const Command = require('./../../utils/novaCommand')
const { DateTime, Interval } = require('luxon')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      group: 'warframe',
      name: 'time',
      aliases: ['utc', 'reset'],
      description: 'Shows Warframe server time and time left until Warframe daily reset.'
    })
  }

  async run (message) {
    try {
      await message.channel.send(createEmbed()) // TIME_24_SIMPLE
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

function createEmbed () {
  // Figure out the right times
  const currentTime = DateTime.utc()
  const resetTime = currentTime.endOf('day')
  let digitalextremesTime = DateTime.utc().setZone('America/Toronto')
  // Checks if sorties have already been updated today (12am in London, Ontario) and sets the desired day to tommorow.
  if (digitalextremesTime.hour >= 12) {
    digitalextremesTime = digitalextremesTime.plus({ days: 1 })
  }
  // Set to sortie refresh time.
  digitalextremesTime = digitalextremesTime.set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
  // Intervals
  const timeUntilReset = Interval.fromDateTimes(currentTime, resetTime)
  const timeUntilSortiesRefresh = Interval.fromDateTimes(currentTime, digitalextremesTime)
  return {
    content: `Current time: **${currentTime.toFormat("h':'mm")}** *(UTC+0)*.`,
    embed: {
      fields: [
        {
          name: 'New sorties in',
          value: timeUntilSortiesRefresh.toDuration().toFormat("h':'mm")
        },
        {
          name: 'Daily reset in',
          value: timeUntilReset.toDuration().toFormat("h':'mm")
        }
      ]
    }
  }
}
