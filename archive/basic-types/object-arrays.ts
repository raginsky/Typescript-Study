// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'firstName',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author'],
// };

// const ADMIN = 0;
// const READONLY = 1;
// const AUTHOR = 2;

enum Role { ADMIN, READONLYm, AUTHOR};
// enum Role { ADMIN = ADMIN, READONLY = 100, AUTHOR= 200};

const person = {
    name: 'firstName',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};

// person.role.push('admin');
// person.role[1] = 10; // ERROR
// person.role = [0, 'admin', 'user']; // ERROR

let favoriteActivities: any[];
favoriteActivities = ['Sports', 1];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); // ERROR
}

if (person.role === Role.ADMIN) {
    console.log('ADMIN');
}