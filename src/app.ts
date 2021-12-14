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

function add(a: Combinable, b: Combinable) {
    /** Type Guard */
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

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