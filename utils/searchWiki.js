import fetch from "node-fetch"

let searchOptions = {
	uri: "https://warframe.fandom.com/api/v1/Search/List",
	qs: {
		query: "",
		limit: 1,
		minArticleQuality: 10,
		batch: 1,
		namespaces: "0"
	},
	headers: {
		"User-Agent": "Request-Promise"
	},
	json: true
}

let detailOptions = {
	uri: "https://warframe.fandom.com/api/v1/Articles/Details",
	qs: {
		ids: "",
		abstract: 500,
		width: 400,
		height: 300
	},
	headers: {
		"User-Agent": "Request-Promise"
	},
	json: true
}

export default function(query){
	return new Promise(function(resolve, reject) {
		


		searchOptions.qs.query = query

		fetch(searchOptions)
			.then(result => {
				detailOptions.qs.ids = result.items[0].id
				fetch(detailOptions)
					.then(result =>
						resolve(result)
					)
					.catch(reason => reject(reason))
			})
			.catch(reason => reject(reason))
	})
}
