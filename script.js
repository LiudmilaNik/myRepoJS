"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
let servicePrice1 = +prompt("Сколько это будет стоить?", "3000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "service2");
let servicePrice2 = +prompt("Сколько это будет стоить?", "5000");

let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePersentPrice;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
};

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};

const getTitle = function () {
  return (
    title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase()
  );
};

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePersentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(Math.ceil(servicePersentPrice));
console.log(screens.length);
console.log(screens.toLowerCase().split(", "));

console.log(
  "Стоимость верстки экранов " +
    screenPrice +
    " юани и Стоимость разработки сайта " +
    fullPrice +
    " юани"
);

console.log(allServicePrices);
console.log(fullPrice);
console.log(servicePersentPrice);
