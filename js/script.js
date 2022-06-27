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

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [] /*массив данных по экранам*/,
  screenPrice: 0,
  screenNumber: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0 /*свойство ст-ти доп.услуг в %%*/,
  servicePricesNumber: 0 /*свойство ст-ти доп.услуг в руб*/,
  fullPrice: 0,
  servicePersentPrice: 0,
  servicesPersent: {} /*объект доп.услуг в %%*/,
  servicesNumber: {} /*объект доп.услуг в руб*/,
  init: function () {
    appData.addTitle();

    /*описание работы ползунка:*/
    inputTypeRange.addEventListener("input", (e) => {
      spanRangeValue.textContent =
        inputTypeRange.value; /*значение под ползунком*/
      appData.rollback = +inputTypeRange.value;
    }),
      handler.addEventListener("click", appData.start);
    // handler.addEventListener("click", this.start.bind(this));
    screenBtn.addEventListener("click", appData.addScreenBlock);
    // screenBtn.addEventListener("click", this.addScreenBlock.bind(this));
    appData.handlerDisabled();
  },

  /*Запретить нажатие кнопки Рассчитать, если не заполнены Тип экранов и Количество экранов:*/
  checkValues: () => {
    const mainElement = document.querySelector(".main-controls__views");
    const select = mainElement.querySelectorAll("select");
    const input = mainElement.querySelectorAll("input");

    handler.disabled = false;

    const items = [...select, ...input];

    items.forEach((item) => {
      if (item.value == "") {
        handler.disabled = true;
      }
    });
  },

  handlerDisabled: () => {
    handler.disabled = true;
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      select.addEventListener("input", appData.checkValues);
      input.addEventListener("input", appData.checkValues);
    });
  },

  addTitle: () => {
    document.title = title.textContent;
  },

  start: () => {
    appData.addScreens();
    appData.addServises();
    appData.addPrices();
    // appData.getServicePercentPrices();
    appData.showResult();
    // appData.handlerDisabled();
  },

  /*вывод результатов Итого на экран:*/
  showResult: () => {
    total.value = appData.screenPrice;
    totalCount.value = +appData.screenNumber;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePersentPrice;
  },

  /*получение со страницы данных по экранам:*/
  addScreens: () => {
    /*переопределение коллекции перед каждым расчетом:*/
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: input.value,
      });
    });
    console.log(appData.screens);
  },

  /*получение со страницы данных по доп.услугам:*/
  addServises: () => {
    /*перебрать коллекцию otherItemsPercent, чтобы получить необходимые переменные:*/
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      /*проверка: если выбран чекбокс, то значение инпута попадает в servicesPersent по ключу label.textContent:*/
      if (check.checked) {
        appData.servicesPersent[label.textContent] = +input.value;
      }
    });
    /*аналогично перебору по доп.услугам в %%:*/
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  /*клонирование элементов screen:*/
  addScreenBlock: () => {
    /*склонировать 1ый эл-т коллекции и поместить в переменную cloneScreen:*/
    const cloneScreen = screens[0].cloneNode(true);
    /*последний элемент коллекции поместить перед клонированным элементом: */
    screens[screens.length - 1].after(cloneScreen);
    appData.handlerDisabled();
  },

  addPrices: () => {
    /*расчет количества экранов:*/
    for (let screen of appData.screens) {
      appData.screenNumber += +screen.count;
    }

    /*расчет стоимости экранов:*/
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    // appData.screenPrice = appData.screens.reduce(function (sum, screen) {
    //   return (sum += +screen.price);
    // }, 0);

    /*расчет стоимости доп.услуг:*/
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPersent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPersent[key] / 100);
    }
    /*расчет стоимости экранов с учетом доп.услуг:*/
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    /*расчет стоимости с учетом отката:*/
    appData.servicePersentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  logger: () => {
    console.log(appData.fullPrice);
    console.log(appData.servicePersentPrice);
    console.log(appData.services);
  },
};

appData.init();
