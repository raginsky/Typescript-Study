type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

/** The result is new object type, that includes both previous */
type ElevatedEmployee = Admin & Employee;

/** Another option is to change types to interfaces
 * interface ElevatedEmployee extends Employee, Admin {}
 */

const e1: ElevatedEmployee = {
    name: 'John',
    privileges: ['create-server'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

/** Can be only number since it's common combined previous types*/
type Universal = Combinable & Numeric;


/** Function overloads:
 * we're basically saying to TS that if we're getting 2 numbers,
 * then return of this function is also a number
 */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;

function add(a: Combinable, b: Combinable) {
    /** Type Guard */
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

/** Optional chaining */
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    // job: {title: 'CEO', description: 'My Company',}
};
/** Execute only if job is defined
 * console.log(fetchedUserData?.job.title);
 */

/** Nullish Coalescing:
 *  If this is null OR undefined - then use the fallback
 */
const userInput = '';
const storedData = userInput ?? 'DEFAULT';

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`);
    /** Custom Type Guard */
    if ('privileges' in emp) {
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ('startDate' in emp) {
        console.log(`Date: ${emp.startDate}`);
    }
}

printEmployeeInformation(e1);

class Car {
    drive() {
        console.log('Driving...');
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo... ${amount}`);
    }
}

class Truck {
    drive() {
        console.log('Driving...');
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo... ${amount}`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    /** Type Guard to check if based on specific constructor function */
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

/** Discriminated Unions */
interface Bird {
    /** Kind of object description */
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Moving at speed ${speed}`)
}

moveAnimal({type: 'bird', flyingSpeed: 300});

/** Type casting */
const userInputElement = <HTMLInputElement>document.getElementById('user_input');

/** Alternative:
 * const userInputElement = document.getElementById('user_input')! as HTMLInputElement;
 *
 * Alternative if returned value can possible be null:
 * const userInputElement = document.getElementById('user_input');
 * if(userInputElement) {
 *     (userInputElement as HTMLInputElement).value = 'Hi there!';
 * }
 */

userInputElement.value = 'Hi there!';

interface ErrorContainer {
    /** Index type - if we don't know exactly which property we will get
     * must have property and value of type string
     */
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character',
}