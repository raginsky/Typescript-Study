/** Basically 2 connected types
 * const names: Array<string> = []; // string[]
 * names[0].split(' ');
 * Helps to get additional type information
 * const promise: Promise<string> = new Promise((resolve, reject) => {
 * setTimeout(() => {
 * resolve('Done!');
 * }, 2000);
 * });
 */

/** Constraints: ex.: The T type could be any type but has to be an object */
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

/**
 * const mergedObj = merge({name: 'Max'}, {age: 30} as {name: string, age: number});
 * const mergedObj = merge<{name: string, hobbies: string[]}, { age: number }>({name: 'Max', hobbies: ['Sports']}, {age: 30});
 */
const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log(mergedObj.age);

interface Length {
    length: number;
}

function countAndPrint<T extends Length>(element: T): [T, string] {
    let descriptionText = 'No value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}

console.log(countAndPrint(''));

/** The second parameter must be any kind of key in first parameter object */
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value' + obj[key];
}

/** So the second parameter will not return error only in case when it really exists in object */
extractAndConvert({name: 'Rogan'}, 'name');

class DataStorage<T extends string | number | boolean> {
    /**
     * We can create it as Union type. But won't!
     * With Union types we can't lock certain type for entire function on init.
     * private data: string[] | number[] | boolean[] = []
     */

    private data: T[] = [];


    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Felix');
textStorage.addItem('Manu');
textStorage.removeItem('Felix');
console.log(textStorage.getItems());

/** Can create different type of storages from same class */
const numberStorage = new DataStorage<number>();

/**
 * const objStorage = new DataStorage<object>();
 * objStorage.addItem({name: 'Felix'});
 * objStorage.addItem({name: 'Manu'});
 * objStorage.removeItem({name: 'Manu'});
 * console.log(objStorage.getItems());
 */

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

/**
 * function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
 *     return {title: title, description: description, completeUntil: date};
 * }
 */

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    /** Partial allows us to use interface optionally */
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Leon', 'Anna'];
// names.push('Manu');
