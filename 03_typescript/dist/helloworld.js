var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Logger = /** @class */ (function () {
    function Logger() {
        this.foo = 'Logger';
        console.debug('Logger constructor()');
    }
    Logger.prototype.log = function (msg) {
        console.log(this.foo + ": " + msg);
    };
    return Logger;
}());
var logger = new Logger();
logger.log('Hello World!');
var gs;
(function (gs) {
    var Person = /** @class */ (function () {
        function Person(p) {
            this._partner = undefined;
            this._married = false;
            this.name = p.name;
            this.height = p.height;
        }
        Person.prototype.sayHello = function () {
            return "Hello, my name is " + this.name;
        };
        Object.defineProperty(Person.prototype, "partner", {
            get: function () {
                return this._partner;
            },
            set: function (partner) {
                if (this._partner) {
                    throw new Error("Person " + this.name + " already has a partner");
                }
                else if (partner == this) {
                    throw new Error(this.name + " can't have himself/herself as a partner");
                }
                else if (partner && partner == this._partner) {
                    console.log(this.name + " already has " + partner.name + " as partner");
                }
                else {
                    this._partner = partner;
                }
            },
            enumerable: true,
            configurable: true
        });
        Person.prototype.marry = function () {
            if (this._married) {
                throw new Error("Person " + this.name + " can't marry because he/she is already married");
            }
            else if (!this._partner) {
                throw new Error("Person " + this.name + " can't marry because he/she has no Partner");
            }
            else if (this._partner == this) {
                throw new Error("Person " + this.name + " can't marry himself/herself");
            }
            else {
                this._married = true;
            }
        };
        Person.prototype.divorce = function () {
            this._married = false;
            this._partner = undefined;
        };
        return Person;
    }());
    gs.Person = Person;
})(gs || (gs = {}));
(function (gs) {
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(s) {
            var _this = _super.call(this, s) || this;
            _this.university = s.university;
            return _this;
        }
        Student.prototype.study = function () {
        };
        return Student;
    }(gs.Person));
    gs.Student = Student;
})(gs || (gs = {}));
(function (gs) {
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(e) {
            var _this = _super.call(this, e) || this;
            _this.company = e.company;
            return _this;
        }
        Employee.prototype.work = function () {
        };
        return Employee;
    }(gs.Person));
    gs.Employee = Employee;
})(gs || (gs = {}));
var gregor = new gs.Employee({
    name: 'Gregor Sondermeier',
    height: 185,
    company: 'Funke Digital'
});
var lisa = new gs.Person({
    name: 'Lisa Friedrich',
    height: 170
});
gregor.partner = lisa;
lisa.partner = gregor;
logger.log(gregor.sayHello());
console.log('gregor:', gregor);
