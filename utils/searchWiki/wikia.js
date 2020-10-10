import fetch from 'node-fetch'
import _ from 'lodash'
import common_tags from 'common-tags'
const { isString, isNumber } = _
const { oneLineTrim } = common_tags

// TODO: queue

export async function wikiSearch (query) {
  if (isString(query) === false) { throw new Error('Search query provided is not a string.') }
  let result
  await fetch(oneLineTrim`https://warframe.fandom.com/api/v1/Search/List
    ?query=${encodeURIComponent(query)}
    &limit=1
    &minArticleQuality=10
    &batch=1
    &namespaces=0`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(json => { result = json })
    .catch(error => {
      console.error(error)
      throw new Error('Error retrieving search result from wikia.')
    })
  return result
}

export async function wikiArticle (id) {
  if (isNumber(id) === false) { throw new Error('ID provided is not a number.') }
  let result
  await fetch(oneLineTrim`https://warframe.fandom.com/api/v1/Articles/Details
  ?ids=${encodeURIComponent(String(id))}
  &abstract=500
  &width=400
  &height=300`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(json => {
      result = json
    })
    .catch(error => {
      console.error(error)
      throw new Error('Error retrieving search result from wikia.')
    })
  return result
}
