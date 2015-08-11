Template.search.events
	'click .search': (event) ->
		console.log $(event.currentTarget).children('input').first().focus()
