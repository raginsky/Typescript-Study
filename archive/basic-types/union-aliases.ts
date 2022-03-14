type Combinable = number | string;
type Conversion = 'num' | 'text';

function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: Conversion,
) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'num') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;

    /**  if (resultConversion === 'num') {
         return +result;
     } else {
         return result.toString();
     }
     */
}

const combinedAges = combine(30, 44, 'num');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'num');
console.log(combinedStringAges);

const combinedNames = combine('first', 'last', 'text');
console.log(combinedNames);
