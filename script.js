let title = "Projekt";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 20;
let rollback = 10;
let fullPrice = 50;
let adaptive = true;

console.log(typeof title);
console.log(screens.length);
console.log(screens.toLowerCase().split(", "));
console.log(screenPrice);
console.log(fullPrice);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log((fullPrice * rollback) / 100);
