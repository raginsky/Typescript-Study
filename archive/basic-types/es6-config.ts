const button = document.querySelector('button')!;

function clickHandle(msg: string) {
    console.log('Click!' + msg);
}

if (button) {
    button.addEventListener('click', clickHandle.bind(null, 'Correct string'));
}

const hobbies = ['Photo', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

const person = {
    firstName: 'Kermit',
    age: 51
};
const copiedPerson = {...person};

console.log(`Hobbies: ${hobbies} / Copied Person: ${copiedPerson}`);

const add = (...numbers: number[]) => {
    numbers.reduce((prevVal, curVal) => {
        return prevVal + curVal;
    }, 0);
};

const addedNums = add(5,10,2,3.7);
console.log(`Added numbers: ${addedNums}`);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(`Destructed array #1 : ${hobby1}, #2 : ${hobby2}, remained: ${remainingHobbies}`);

const { firstName: userName, age: userAge } = person;
console.log(`Username: ${userName} / User Age: ${userAge}`);