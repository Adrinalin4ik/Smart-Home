var opn = require('opn');

var DEFAULT_INTERVAL = 1000;
var queue = [];

class Task {
	constructor(title, exec_func, time){
		this.id = this.guid();
		this.title = title;
		this.func = exec_func;
		this.time = time;
	}

	execute() {
		this.func();
		this.remove();
	}

	remove() {
		const index = queue.findIndex(x=> x.id == this.id)
		queue.splice(index, 1)
	}

	guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
}


class ApplicationController {
	index(req, res, next) {
	  res.render('index', { queue:queue });
	}

	removeTask(req, res, next){
		const id = req.params.id
		const index = queue.findIndex(x=> x.id == id)
		console.log(index)
		queue.splice(index, 1)
		res.redirect('/')
	}

	openApp(req, res, next){
		switch(req.params.appName){
			case "youtube":
				opn('https://www.youtube.com/tv', {app: 'chrome'});
				break;
			case "vk":
				opn('https://vk.com/im', {app: 'chrome'});
				break;
			case "mail":
				opn('https://e.mail.ru/messages/inbox/', {app: 'chrome'});
				break;
			case "telegram":
				opn('https://web.telegram.org', {app: 'chrome'})
				break;
			default: break;
		}

		res.redirect('/')
	}

	schedule(title, exec_func, time){
		queue.push(new Task(title, exec_func, time))
	}

	startWorker(){
		setInterval(() => {
			const currentTime = new Date();
			console.log("check", currentTime)
			console.log("queue status:", queue.length)
			queue.forEach((task) => {
				if (task.time <= currentTime) task.execute();
			})
		}, DEFAULT_INTERVAL)
	}
}

let ac = new ApplicationController();
module.exports = ac