"use strict";
const title = document.getElementsByTagName("h1");
console.log(title[0]);

const handler = document.getElementsByClassName("handler_btn");
console.log(handler);

const screenBtn = document.querySelector(".screen-btn");
console.log(screenBtn);

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
console.log(otherItemsPercent);

const otherItemsNumber = document.querySelectorAll(".other-items.number");
console.log(otherItemsNumber);

const inputTypeRange = document.querySelector(".rollback input[type=range]");
console.log(inputTypeRange);

const spanRangeValue = document.querySelector(".rollback span.range-value");
console.log(spanRangeValue);

const totalInput = document.getElementsByClassName("total-input");
for (let key of totalInput) {
  console.log(key);
}

let allScreen = document.querySelectorAll(".screen");
console.log(screen);

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePersentPrice: 0,
  services: {},

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?");
    } while (appData.isNumber(appData.title.trim()));

    for (let i = 0; i < 2; i++) {
      let name;

      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (appData.isNumber(name.trim()));

      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (appData.isNumber(name.trim()));

      let servicePrice = 0;

      do {
        servicePrice = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(servicePrice));

      appData.services[name + i] = +servicePrice;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    // расчет стоимости экранов
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }
    appData.screenPrice = appData.screens.reduce(function (sum, screen) {
      return (sum += +screen.price);
    }, 0);

    // расчет стоимости доп.услуг
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePersentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase();
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePersentPrice);
    console.log(appData.screens);
    console.log(appData.services);
    // console.log(appData.title);
    // for (let key in appData) {
    //   console.log("ключ:" + key + " " + "Значение:" + appData[key]);
    // }
  },
  // logger: function () {
  //   for (let key in appData) {
  //     console.log(appData[key]);
  //   }
  //
  // },
};

appData.start();
