Template.search.events
	'click .search': (event) ->
		$(event.currentTarget).children('input').first().focus()


	#Store the search text for sim filter
	'keyup .search': (event) ->
		search_text = $(event.currentTarget).children('input').val()
		Session.set 'search_text', search_text
