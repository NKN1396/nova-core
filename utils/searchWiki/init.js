import sqlite3  from "sqlite3"
sqlite3.verbose()
import common_tags from "common-tags"
const { stripIndents } = common_tags

const db = new sqlite3.Database("./wiki.sqlite3")

db.serialize(function(){
	db.run(stripIndents`CREATE TABLE IF NOT EXISTS queries (
		query TEXT PRIMARY KEY,
		wikia_id INTEGER,
		lastchecked_timestamp INTEGER,
		official_id TEXT
	);`)
	db.run(stripIndents`CREATE TABLE IF NOT EXISTS articles (
		wikia_id INTEGER PRIMARY KEY,
		revision_id INTEGER,
		lastchecked_timestamp INTEGER,
		lastchecked_content TEXT NOT NULL,
		manual_overrides TEXT
	);`)
})

db.close()
