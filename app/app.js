const fs = require('fs');
const Path = require('path')
const jsyaml = require(Path.join(__dirname, "bower_components/js-yaml/dist/js-yaml.min.js"))

const BrowserWindow = require('electron').remote.BrowserWindow;
const bundle_root = Path.resolve(__dirname, "bundle")
var sims = jsyaml.load(fs.readFileSync(Path.join(bundle_root, "config.yml")))

var child_proc = require('child_process')
//Dom ready
$(function(){
	for (sim of sims) {
		sim_root = Path.join(bundle_root, sim[':url_hash'])
		$(`
			<div class='sim mui-panel' data-sim-urlhash='${sim[":url_hash"]}'>
				<img src="${Path.join(sim_root, sim[":image_file_name"])}"></img>
				<p class='name'>${sim[":name"]}</p>
			</div>
		`).appendTo($('#sim-list'))
	}

	//Search. 
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

	//Better search. Focus on any keypress
	$(document).keydown(function(e){
		$('#search').focus()
	});

	$('.sim').click(function(e){
		url_hash = $(e.currentTarget).attr('data-sim-urlhash')

		sim = sims.filter(function(el, index, array){
			return (el[':url_hash'] == url_hash)
		})[0]

		sim_path = Path.join(bundle_root, sim[':url_hash'], sim[':file_name'])
		console.log(sim[':type'])
		if (sim[':type'] == ':java'){
			launchJava(sim_path);
		}
		else if (sim[':type'] == ':flash'){
			launchFlash(sim_path);
		} else if (sim[':type'] == ':html'){
			launchHtml(sim_path)
		}
	})
})

function launchHtml(path){
	var win = new BrowserWindow({ width: 800, height: 600, show: false, webPreferences:{nodeIntegration:false}});
	win.on('closed', function() {
	  win = null;
	});
	win.setMenu(null);
	win.loadURL('file://' + path);
	win.show();
}
function launchFlash(path){
	var win = new BrowserWindow({ width: 800, height: 600, show: false, webPreferences:{nodeIntegration:false, plugins: true}}); //Test websec true and false, prefer true
	win.on('closed', function() {
	  win = null;
	});
	win.setMenu(null);
	win.loadURL('file://' + path);
	win.show();
}
function launchJava(path){///Users/lukeadams/Projects/phet-launcher/app/java/osx/Contents/Home/bin
	const java_binary = Path.join(__dirname, 'java', 'windows', 'bin', 'java.exe')
	child_proc.exec(`${java_binary} -jar "${path}"`) //Move to spawn. options.detached and child.unref()
}


