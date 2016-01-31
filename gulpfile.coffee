gulp        = require 'gulp'
packager 	= require 'electron-packager'
path 		= require 'path'

gulp.task 'default', ()->

gulp.task 'build', (finish)->
	#Get Java plugins
	#Currently OSX plugin only
	console.log path.join __dirname, 'app'
	packager {
		arch: 			'x64'
		dir:			path.join __dirname, 'app'
		platform:		'win32'	#OS X not really needed...
		version:		'0.36.7'
		overwrite:		true
		asar: 			false 	#Breaks Java sims
		icon:			'./icons/phet-logo'
		#icon: 			'./assets/icon' #Create an icon
		out:			path.join __dirname, 'out'

	}, (err, appPath)->
		console.log err + appPath