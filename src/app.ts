/** Let's see interface as custom type */
interface Greetable {
    name: string;

    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}

let user1: Greetable;

user1 = new Person('Joe');

/** We can be sure that user will have greet() method since it uses Interface with this method */
user1.greet(`Hi there! I'm`);

console.log({user1});