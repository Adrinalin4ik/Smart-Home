class System {
	constructor(){
		this.os = process.platform;
		this.commands = {
			sleep:{
				windows:"test",
				linux:""
			},
			shutdown:{
				windows:"shutdown -s",
				linux:""
			}
		}
	}

	getMethod(name){
		switch(this.os){
			case "win32":
				return this.commands[name]['windows']
			case "linux":
				return this.commands[name]['linux']
			default: break;
		}
	}
}

module.exports = new System();