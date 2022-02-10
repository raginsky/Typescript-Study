import _ from 'lodash';
// import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {Product} from "./product.model";

console.log(_.shuffle([1, 2, 3]));

declare var GLOBAL: any;
console.log(GLOBAL);

const products = [
    {title: 'A Carpet', price: 29.99},
    {title: 'A Book', price: 10.99}
];

// const p1 = new Product('A book', 12.99);

// console.log(p1.getInformation());

// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price);
// })
// for (const prod of loadedProducts) {
//     console.log(prod.getInformation());
// }

const loadedProducts = plainToClass(Product, products);
for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}
