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
// function merge<T extends object, U extends object>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }
/**
 * const mergedObj = merge({name: 'Max'}, {age: 30} as {name: string, age: number});
 * const mergedObj = merge<{name: string, hobbies: string[]}, { age: number }>({name: 'Max', hobbies: ['Sports']}, {age: 30});
 */
var mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj.age);
function countAndPrint(element) {
    var descriptionText = 'No value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements";
    }
    return [element, descriptionText];
}
console.log(countAndPrint(''));
