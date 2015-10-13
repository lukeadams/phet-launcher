gulp        = require 'gulp'
NwBuilder   = require 'nw-builder'
request     = require 'request'


gulp.task 'default', ()->

gulp.task 'build', (finish)->
  #Get Java plugins
  #Currently OSX plugin only
  nw = new NwBuilder({
    files: ['./app/**', './plugins/Java-Plugin.bundle/**']
    platforms: ['osx64']
    version: '0.12.3'
    cacheDir: './cache/nw'
  })

  x = new Future
  nw.build (err)->
    finish(err)