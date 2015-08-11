Template.search.events
	'click .search': (event) ->
		$(event.currentTarget).children('input').first().focus()
