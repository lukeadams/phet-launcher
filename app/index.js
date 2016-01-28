var jsyaml = require("./bower_components/js-yaml/dist/js-yaml.min.js")
var fs = require('fs');
var Path = require('path')
var bundle_root = Path.resolve("../../phet-scraper/bundle/")
var sims = jsyaml.load(fs.readFileSync(Path.join(bundle_root, "config.yml")))
	for (sim of sims) {
		sim_root = Path.join(bundle_root, sim[':url_hash'])
		var _dom = $(`
			<div class='sim mui-panel' data-sim-urlhash='${sim[":url_hash"]}'>
				<img src="${Path.join(sim_root, sim[":image_file_name"])}"></img>
				<p class='name'>${sim[":name"]}</p>
			</div>
		`).appendTo($('#sim-list'))
	}
	$('#search').keyup(function(event){
		_text = event.delegateTarget.value
		$('.sim').each(function(num, sim){
			sim = $(sim)

			sim.removeClass('hidden') //Unhide them all

			_name = sim.children(".name").first().text()
			_matches = (_name.toLowerCase().indexOf(_text.toLowerCase()) != -1)

			if (!_matches) {
				sim.addClass('hidden')
			}
		})
	})
