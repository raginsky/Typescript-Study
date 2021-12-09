interface AddFn {
    (a: number, b: number): number;
}

/** So now we have like anonymous function inside interface */
let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

/** Let's see interface as custom type */
interface Named {
    readonly name: string;
    /** Optional property (methods can be marked too) */
    readonly optional?: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    optional?: string;
    age = 30;

    constructor(n: string, o?: string) {
        this.name = n;
        /** Need to be checked if exist since optional */
        if (o) {
            this.optional = o;
        }
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

let user1: Greetable;

user1 = new Person('Joe');

/** Can't be changed outside of the class since property is readonly
 * user1.name = "Name";
 */

/** We can be sure that user will have greet() method since it uses Interface with this method */
user1.greet(`Hi there! I'm`);

console.log({user1});