namespace gs {
	export interface ILogger {
		log: (msg: string) => void;
	}
}
namespace gs {
	export class Logger implements gs.ILogger {
		private foo: string = 'Logger';

		log(msg: string): void {
			console.log(`${this.foo}: ${msg}`);
		}
	}
}

let logger: gs.Logger = new gs.Logger();
logger.log('Hello World!');

/////////////////////////////////////////////////////////////////////////////////

namespace gs {
	export interface IPersonData {
		name: string;
		height: number;
	}

	export interface IPerson extends gs.IPersonData {
		sayHello(): Promise<string>;
		marry(partner: gs.IPerson): void;
		divorce(): void;
	}
}

namespace gs {
	export interface IStudentData extends gs.IPersonData {
		university: string;
	}

	export interface IStudent extends gs.IStudentData, gs.IPerson {
		study(): void;
	}
}

namespace gs {
	export interface IEmployeeData extends gs.IPersonData {
		company: string;
	}

	export interface IEmployee extends gs.IEmployeeData, gs.IPerson {
		work(): void;
	}
}

namespace gs {
	export class Person implements gs.IPerson {
		name: string;
		height: number;
		private _partner?: gs.Person = undefined;
		private _married: boolean = false;

		constructor(p: gs.IPersonData) {
			this.name = p.name;
			this.height = p.height;
		}

		sayHello(delay: number = 2000): Promise<string> {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (Math.random() < 0.25) {
						reject(new Error('Math.random() yielded < 0.25.'));
					} else {
						resolve(`Hello, my name is ${this.name}.`);
					}
				}, delay);
			});
		}

		get partner(): gs.Person | undefined {
			return this._partner;
		}

		set partner(partner: gs.Person | undefined) {
			if (partner && this._partner && partner == this._partner) {
				console.log(`${this.name} already has ${this._partner.name} as partner.`);
			} else if (this._partner) {
				throw new Error(`Person ${this.name} already has a partner.`);
			} else if (partner == this) {
				throw new Error(`${this.name} can't have himself/herself as a partner.`);
			} else {
				this._partner = partner;
			}
		}

		marry(): void {
			if (this._married) {
				throw new Error(`Person ${this.name} can't marry because he/she is already married.`);
			} else if (!this._partner) {
				throw new Error(`Person ${this.name} can't marry because he/she has no Partner.`);
			} else if (this._partner == this) {
				throw new Error(`Person ${this.name} can't marry himself/herself.`);
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

		constructor(s: gs.IStudentData) {
			super(s);
			this.university = s.university;
		}

		study(): void {

		}
	}
}

namespace gs {
	export class Employee extends gs.Person implements gs.IEmployee {
		company: string;

		constructor(e: gs.IEmployeeData) {
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

gregor.sayHello(1000)
	.then((msg: string): string => {
		logger.log(msg);
		return `${gregor.name} just greeted.`;
	})
	.then((msg: string): void => {
		logger.log(msg);
	})
	.catch((err: Error) => {
		console.error(err);
	});

let promises = [
	gregor.sayHello(1000),
	lisa.sayHello(2000)
];
Promise.all(promises)
	.then((msgs: Array<string>) => {
		logger.log('=========');
		msgs.forEach((msg: string) => {
			logger.log(<string>msg);
		});
		return msgs.length;
	})
	.catch((err: Error) => {
		console.error(err);
	})
	.then((msgsLength = 0) => {
		logger.log(`${msgsLength} person(s) just greeted.`);
	});

console.log('gregor:', gregor);