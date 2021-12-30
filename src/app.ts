/** Decorator factory */
function Logger(logString: string) {
    /** Decorator */
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    /** `_` basically tells to Typescript, that, yes, we need this argument, but we wouldn't really use it */
    return function (_: Function) {
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
        }
    }
}

/** Decorator provide a way to add annotations for class declaration.
 * It will be executed before class members he's come before.
 * @Logger('LOGGING PERSON')
 * */
@WithTemplate('<h1>Person object</h1>', 'app')
class Person {
    name = 'David';

    constructor() {
        console.log('Creating new object...');
    }
}

const persons = new Person();
console.log(persons);