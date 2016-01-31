require 'bundler'
Bundler.setup

require 'phet_scraper'
require 'fileutils'


desc "???"
task :js_deps do
	`npm install`
end

desc ""
task :build do
	PhetScraper.fetch File.join(File.dirname(__FILE__), 'app', 'bundle')
	#{}`gulp build` #nwjs package

end
