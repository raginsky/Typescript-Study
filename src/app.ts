/** Decorator factory */
function Logger(logString: string) {
    /** Decorator */
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    /** `_` basically tells to Typescript, that, yes, we need this argument, but we wouldn't really use it
     * return function (_: Function) {
     */
    return function (constructor: any) {
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            /** Now it's kind of utility, that provides element render */
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

/** Decorator provide a way to add annotations for class declaration.
 * It will be executed before class members he's come before.
 */
@Logger('LOGGING PERSON')
@WithTemplate('<h1>Person object</h1>', 'app')
class Person {
    name = 'David';

    constructor() {
        console.log('Creating new object...');
    }
}

const persons = new Person();
console.log(persons);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    /** Executes when we define this property */
    @Log
    title: string;

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price');
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}