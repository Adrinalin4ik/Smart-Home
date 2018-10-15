var cmd=require('node-cmd');
var system = require('./system_controller')
var ApplicationController = require('./application_controller')

class PowerController {
	constructor(){
	}
	sleep(req, res, next){
		const params = req.body
		const time = params.time;

		let planTime = new Date().getTime() + time*60*1000;
		ApplicationController.schedule(`Sleep`, ()=> {
			cmd.run(system.getMethod('sleep'))
			// cmd.run("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")
		},planTime)
		
		res.redirect('/');
	}

	shutdown(req, res, next){
		const params = req.body
		const time = params.time;

		let planTime = new Date().getTime() + time*60*1000;
		console.log("Here")
		ApplicationController.schedule(`Shutdown`, ()=> {
			cmd.run(system.getMethod('shutdown'))
			// cmd.run("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")
		},planTime)
		
		res.redirect('/');
	}
}


let pc = new PowerController();
console.log(pc)
module.exports = pc