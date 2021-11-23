"use strict";
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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READONLYm"] = 1] = "READONLYm";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
// enum Role { ADMIN = ADMIN, READONLY = 100, AUTHOR= 200};
var person = {
    name: 'firstName',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};
// person.role.push('admin');
// person.role[1] = 10; // ERROR
// person.role = [0, 'admin', 'user']; // ERROR
var favoriteActivities;
favoriteActivities = ['Sports', 1];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); // ERROR
}
if (person.role === Role.ADMIN) {
    console.log('ADMIN');
}
