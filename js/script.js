"use strict";

const title = document.getElementsByTagName("h1")[0];
const handler = document.getElementsByClassName("handler_btn")[0];
const handlerReset = document.getElementsByClassName("handler_btn")[1];
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
    handlerReset.addEventListener("click", appData.reset);
    screenBtn.addEventListener("click", appData.addScreenBlock);
    // screenBtn.addEventListener("click", this.addScreenBlock.bind(this));
    appData.handlerDisabled();
  },

  /*Запретить нажатие кнопки Рассчитать, если не заполнены Тип экранов и Количество экранов:*/
  checkValues: function () {
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

  handlerDisabled: function () {
    handler.disabled = true;
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      select.addEventListener("input", appData.checkValues);
      input.addEventListener("input", appData.checkValues);
    });
  },

  /*блокировка экранов после клика на Расчитать*/
  screensDisabled: function () {
    const mainElement = document.querySelector(".main-controls__views");
    const select = mainElement.querySelectorAll("select");
    const input = mainElement.querySelectorAll("input");

    const items = [...select, ...input];

    items.forEach((item) => {
      item.disabled = true;
    });
  },

  /*разблокировка экранов*/
  screensIncluded: function () {
    const mainElement = document.querySelector(".main-controls__views");
    const select = mainElement.querySelectorAll("select");
    const input = mainElement.querySelectorAll("input");

    const items = [...select, ...input];

    items.forEach((item) => {
      item.disabled = false;
    });
  },

  /*удаление клонированных экранов*/
  clearSkreenBlock: function () {
    const mainElement = document.querySelector(".main-controls__views");
    const select = mainElement.querySelectorAll("select");
    const input = mainElement.querySelectorAll("input");

    const items = [...select, ...input];

    items.forEach((item, i) => {
      if (i !== 0) {
        item.splice();
      }
    });
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  /*после клика на Рассчитать кнопка заменяется на Сброс*/
  handlerChange: function () {
    handler.style = "display:none";
    handlerReset.style = "display:block;";
  },
  /*после клика на Сброс кнопка заменяется на Рассчитать*/
  handlerChange2: function () {
    handler.style = "display:block";
    handlerReset.style = "display:none";
  },

  start: function () {
    appData.addScreens();
    appData.addServises();
    appData.addPrices();
    // appData.getServicePercentPrices();
    appData.showResult();
    appData.screensDisabled();
    appData.handlerChange();
    // appData.handlerDisabled();
  },

  reset: function () {
    appData.handlerChange2();
    appData.screensIncluded();
    appData.clearResult();
    appData.clearScreens();
    appData.clearCheckServises();
    appData.clearSkreenBlock();
    appData.handler.removeAttribute("disabled");
    appData.inputTypeRange.disabled = false;
    appData.init();
  },

  /*вывод результатов Итого на экран:*/
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = +appData.screenNumber;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePersentPrice;
  },

  /*очистка результатов*/
  clearResult: function () {
    total.value = "0";
    totalCount.value = "0";
    totalCountOther.value = "0";
    fullTotalCount.value = "0";
    totalCountRollback.value = "0";
  },

  /*получение со страницы данных по экранам:*/
  addScreens: function () {
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

  /*oчистка экранов*/
  clearScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      select.value = "";
      input.value = "";
    });
  },
  /*получение со страницы данных по доп.услугам:*/
  addServises: function () {
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

  /*удаление чекбоксов*/
  clearCheckServises: function () {
    const checks = document.querySelectorAll("input[type=checkbox]");
    checks.forEach((check) => {
      check.checked = false;
    });
  },

  /*клонирование элементов screen:*/
  addScreenBlock: function () {
    /*склонировать 1ый эл-т коллекции и поместить в переменную cloneScreen:*/
    const cloneScreen = screens[0].cloneNode(true);
    /*последний элемент коллекции поместить перед клонированным элементом: */
    screens[screens.length - 1].after(cloneScreen);
    appData.handlerDisabled();
  },

  addPrices: function () {
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

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePersentPrice);
    console.log(appData.services);
  },
};

appData.init();
