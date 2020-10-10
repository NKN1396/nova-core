import sqlite3 from 'sqlite3'
import commonTags from 'common-tags'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
sqlite3.verbose()
const { stripIndents } = commonTags
const __dirname = dirname(fileURLToPath(import.meta.url))

const lookup = new sqlite3.Database(join(__dirname, './wiki.sqlite3'), sqlite3.OPEN_READWRITE)
console.log('Database loaded')

export function resolveQueryLocally (query) {
  return new Promise(function (resolve, reject) {
    lookup.get(
      stripIndents`SELECT wikia_id, lastchecked_timestamp
      FROM queries
      WHERE query = ?;`,
      [query],
      function (err, row) {
        if (err !== null) {
          console.error(err)
          reject(new Error(`Error resolving search query "${query} from database."`))
        }
        resolve(row)
      }
    )
  })
}

export async function addQuerySolution (query, wikiaId) {
  lookup.run(stripIndents`INSERT INTO queries (query, wikia_id, lastchecked_timestamp)
  VALUES (?, ?, ?)
  ON CONFLICT (query)
    DO UPDATE SET
      wikia_id=excluded.wikia_id,
      lastchecked_timestamp=excluded.lastchecked_timestamp,
      official_id=excluded.official_id;`,
  [query, wikiaId, Date.now()],
  function (err) {
    if (err !== null) {
      console.error(err)
      throw new Error('Could not insert into or update database.')
    }
  })
}

export async function getCachedArticle (id) {
  return new Promise(function (resolve, reject) {
    lookup.get(
      stripIndents`SELECT revision_id, lastchecked_timestamp, lastchecked_content, manual_overrides
      FROM articles
      WHERE wikia_id = ?;`,
      [id],
      function (err, row) {
        if (err !== null) {
          console.error(err)
          reject(new Error(`Error resolving article with ID "${id} from database."`))
        }
        resolve(row)
      }
    )
  })
}
