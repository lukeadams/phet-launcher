#read sims.json
sims = [{name: 'filter'}, {name: 'gunther'}]

Template.simulation_view.helpers
	##
	#Returns array of sims
	#[{
	#	name: string
	#	pluginsRequired: [string] of ['flash<version>', java<version>, macromedia<version>]
	#	
	#}]
	simulations: () ->
		#TODO: play with implementing ',' as OR , and then '&&'/'AND' as AND
		#apply any filters
		raw_filters = Session.get 'search_text'

		filters = _.without raw_filters.split(','), ''
		if filters.length
			#iterate through and check for each filter constraint
			filtered = _.filter sims, (sim)->
				x = true
				for filter in filters
					#returns false if sim does not contain the constraint
					console.log (sim.name.indexOf(filter) > -1)
					if !(sim.name.indexOf(filter) > -1)
						x = false
				return x
			#Save only unique sims.
			return filtered
		else
			return sims
