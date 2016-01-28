var jsyaml = require("./bower_components/js-yaml/dist/js-yaml.min.js")
var fs = require('fs');
var Path = require('path')
var bundle_root = Path.resolve("../../phet-scraper/bundle/")
var sims = jsyaml.load(fs.readFileSync(Path.join(bundle_root, "config.yml")))
