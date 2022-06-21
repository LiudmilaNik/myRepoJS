"use strict";

const title = document.getElementsByTagName("h1")[0];
const handler = document.getElementsByClassName("handler_btn")[0];
const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputTypeRange = document.querySelector(".rollback input[type=range]");
const spanRangeValue = document.querySelector(".rollback span.range-value");

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

// for (let key of totalInput) {
//   console.log(key);
// }

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePersentPrice: 0,
  servicesPersent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();

    handler.addEventListener("click", appData.start);
    screenBtn.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    appData.addScreens();
    appData.addServises();
    appData.addPrices();
    // appData.getServicePercentPrices();
    appData.showResult();
    // alert("Start");
    // appData.asking();
    // appData.getFullPrice();
    // appData.getTitle();
    // appData.logger();
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
  },
  // isNumber: function (num) {
  //   return !isNaN(parseFloat(num)) && isFinite(num);
  // },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens);
  },

  addServises: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPersent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  // asking: function () {
  // do {
  //   appData.title = prompt("Как называется ваш проект?");
  // } while (appData.isNumber(appData.title.trim()));

  // for (let i = 0; i < 2; i++) {
  //   let name;

  //   do {
  //     name = prompt("Какие типы экранов нужно разработать?");
  //   } while (appData.isNumber(name.trim()));

  //   let price = 0;

  //   do {
  //     price = prompt("Сколько будет стоить данная работа?");
  //   } while (!appData.isNumber(price));
  // } уже не нужно!

  // for (let i = 0; i < 2; i++) {
  //   let name;
  //   do {
  //     name = prompt("Какой дополнительный тип услуги нужен?");
  //   } while (appData.isNumber(name.trim()));

  //   let servicePrice = 0;

  //   do {
  //     servicePrice = prompt("Сколько это будет стоить?");
  //   } while (!appData.isNumber(servicePrice));

  //   appData.services[name + i] = +servicePrice;
  // }

  // appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  // },
  addPrices: function () {
    // расчет стоимости экранов
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    // appData.screenPrice = appData.screens.reduce(function (sum, screen) {
    //   return (sum += +screen.price);
    // }, 0);

    // расчет стоимости доп.услуг
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPersent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPersent[key] / 100);
    }
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;
  },

  // getFullPrice: function () {},
  getServicePercentPrices: function () {
    appData.servicePersentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  // getTitle: function () {
  //   appData.title =
  //     appData.title.trim()[0].toUpperCase() +
  //     appData.title.trim().substring(1).toLowerCase();
  // },

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
  // },
};

appData.init();
