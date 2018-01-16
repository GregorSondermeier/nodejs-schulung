class Logger {
	private foo: string = 'Logger';

	constructor() {
		console.debug('Logger constructor()');
	}

	log(msg: string): void {
		console.log(`${this.foo}: ${msg}`);
	}
}

let logger: Logger = new Logger();
logger.log('Hello World!');

/////////////////////////////////////////////////////////////////////////////////

namespace gs {
	export interface IPerson {
		name: string;
		height: number;
		sayHello?: () => string;
		marry?: (partner: IPerson) => void;
		divorce?: () => void;
	}

	export interface IStudent extends IPerson {
		university: string;
		study?: () => void;
	}

	export interface IWorker extends IPerson {
		company: string;
		work?: () => void;
	}
}

namespace gs {
	export class Person implements gs.IPerson {
		name: string;
		height: number;
		private _partner?: Person = undefined;
		private _married: boolean = false;

		constructor(p: gs.IPerson) {
			this.name = p.name;
			this.height = p.height;
		}

		sayHello(): string {
			return `Hello, my name is ${this.name}`;
		}

		get partner(): gs.Person | undefined {
			return this._partner;
		}

		set partner(partner: gs.Person | undefined) {
			if (this._partner) {
				throw new Error(`Person ${this.name} already has a partner`);
			} else if (partner == this) {
				throw new Error(`${this.name} can't have himself/herself as a partner`);
			} else if (partner && partner == this._partner) {
				console.log(`${this.name} already has ${partner.name} as partner`);
			} else {
				this._partner = partner;
			}
		}

		marry(): void {
			if (this._married) {
				throw new Error(`Person ${this.name} can't marry because he/she is already married`);
			} else if (!this._partner) {
				throw new Error(`Person ${this.name} can't marry because he/she has no Partner`);
			} else if (this._partner == this) {
				throw new Error(`Person ${this.name} can't marry himself/herself`);
			} else {
				this._married = true;
			}
		}

		divorce(): void {
			this._married = false;
			this._partner = undefined;
		}
	}
}

namespace gs {
	export class Student extends gs.Person implements gs.IStudent {
		university: string;

		constructor(s: gs.IStudent) {
			super(s);
			this.university = s.university;
		}

		study(): void {

		}
	}
}

namespace gs {
	export class Employee extends gs.Person implements gs.IWorker {
		company: string;

		constructor(e: gs.IWorker) {
			super(e);
			this.company = e.company;
		}

		work(): void {

		}
	}
}

let gregor: gs.Employee = new gs.Employee({
	name: 'Gregor Sondermeier',
	height: 185,
	company: 'Funke Digital'
});
let lisa: gs.Person = new gs.Person({
	name: 'Lisa Friedrich',
	height: 170
});
gregor.partner = lisa;
lisa.partner = gregor;

logger.log(gregor.sayHello());
console.log('gregor:', gregor);