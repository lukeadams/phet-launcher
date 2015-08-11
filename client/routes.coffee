FlowLayout.setRoot('body')

FlowRouter.route '/', 
	action: () ->
		FlowLayout.render('layout', {view: 'home-view'});