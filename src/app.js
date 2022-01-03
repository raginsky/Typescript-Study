var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** Decorator factory */
function Logger(logString) {
    /** Decorator */
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    /** `_` basically tells to Typescript, that, yes, we need this argument, but we wouldn't really use it */
    return function (_) {
        var hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
        }
    };
}
/** Decorator provide a way to add annotations for class declaration.
 * It will be executed before class members he's come before.
 * @Logger('LOGGING PERSON')
 * */
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'David';
        console.log('Creating new object...');
    }
    Person = __decorate([
        WithTemplate('<h1>Person object</h1>', 'app')
    ], Person);
    return Person;
}());
var persons = new Person();
console.log(persons);
