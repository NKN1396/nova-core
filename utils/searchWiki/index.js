import { wikiSearch, wikiArticle } from './wikia.js'
import { resolveQueryLocally, getCachedArticle, addQuerySolution } from './database.js'

export default async function (query) {
  try {
    // Look up if article is already known
    let dbResponse = await resolveQueryLocally(query)
    let id = dbResponse?.wikia_id
    if (
      (dbResponse?.lastchecked_timestamp === undefined) ||
      ((dbResponse.lastchecked_timestamp + 86400000) < Date.now())
    ) {
      const wikiResponse = await wikiSearch(query)
      id = wikiResponse?.items?.[0]?.id
      addQuerySolution(query, id)
    }
    dbResponse = await getCachedArticle(id)
    const article = dbResponse?.content
    // let article = await wikiArticle(id)
    // return article.items?.[id]
  } catch (error) {
    console.error(error)
    throw new Error('Error retrieving search result')
  }
}
