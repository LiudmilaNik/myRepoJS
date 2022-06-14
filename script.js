"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePersentPrice: 0,
  service1: "",
  service2: "",
  // isNumber: function (num) {
  //   return !isNaN(parseFloat(num)) && isFinite(num);
  // },

  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );

    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let servicePrice;
      if (i === 0) {
        appData.service1 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "service1"
        );
      } else if (i === 1) {
        appData.service2 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "service2"
        );
      }

      do {
        servicePrice = +prompt("Сколько это будет стоить?");
      } while (!isNumber(servicePrice));

      sum += servicePrice;
    }
    return sum;
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
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase()
    );
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePersentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
  },
  logger: function () {
    for (let key in appData) {
      console.log(appData[key]);
    }
  },
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

appData.start();
// appData.asking();
// appData.allServicePrices = appData.getAllServicePrices();
// appData.fullPrice = appData.getFullPrice();
// appData.servicePersentPrice = appData.getServicePercentPrices();
// appData.title = appData.getTitle();

// console.log(appData);
// console.log(appData.fullPrice);
// console.log(appData.servicePersentPrice);
// console.log("appData.allServicePrices", appData.allServicePrices);
// console.log(appData.getAllServicePrices(appData.getFullPrice));
// console.log(appData.servicePersentPrice);
// console.log(
//   "Стоимость верски экранов " +
//     appData.screenPrice +
//     "юани и Стоимость разработки сайта " +
//     appData.fullPrice +
//     "юани"
// );
