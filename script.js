"use strict";

let title = prompt("Как называется ваш проект?");

let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);

let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");

let adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(adaptive);

let servise1 = prompt("Какой дополнительный тип услуги нужен?", "servise1");
let servisePrice1 = +prompt("Сколько это будет стоить?", "3000");

let servise2 = prompt("Какой дополнительный тип услуги нужен?", "servise2");
let servisePrice2 = +prompt("Сколько это будет стоить?", "5000");

// Итоговая стоимость работ
let fullPrice = screenPrice + servisePrice1 + servisePrice2;

// Откат 10%
let rollback = (fullPrice * 10) / 100;

// Итоговая стоимость без отката
let servisePersentPrice = fullPrice - rollback;

console.log(title);
console.log(typeof title);
console.log(screens);
console.log(screens.length);
console.log(screens.toLowerCase().split(", "));
console.log(screenPrice);
console.log(servise1);
console.log(servisePrice1);
console.log(servise2);
console.log(servisePrice2);
console.log(fullPrice);
console.log(typeof fullPrice);
console.log(Math.ceil(servisePersentPrice));
console.log(typeof adaptive);
// console.log((fullPrice * rollback) / 100);

// конструкция условий
// let n = fullPrice;
// switch (n) {
//   case n >= 30000:
//     console.log("Даем скидку в 10%");
//     break;
//   case n >= 15000 && n < 30000:
//     console.log("Даем скидку в 5%");
//     break;
//   case n < 15000 && n > 0:
//     console.log("Скидка не предусмотрена");
//     break;
//   case n < 0:
//     console.log("Что-то пошло не так");
//     break;
// }

let n = fullPrice;
if (n >= 30000) {
  console.log("Даем скидку в 10%");
} else if (n >= 15000 && n < 30000) {
  console.log("Даем скидку в 5%");
} else if (n < 15000 && n > 0) {
  console.log("Скидка не предусмотрена");
} else if (n < 0) {
  console.log("Что-то пошло не так");
}
