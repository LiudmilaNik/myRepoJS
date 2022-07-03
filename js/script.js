"use strict";

const title = document.getElementsByTagName("h1")[0];
const handler = document.getElementsByClassName("handler_btn")[0];
const handlerReset = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

let inputTypeRange = document.querySelector(".rollback input[type=range]");
let spanRangeValue = document.querySelector(".rollback span.range-value");

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
    this.addTitle();

    /*описание работы ползунка:*/
    inputTypeRange.addEventListener("input", (e) => {
      spanRangeValue.textContent =
        inputTypeRange.value; /*значение под ползунком*/
      appData.rollback = +inputTypeRange.value;
    }),
      handler.addEventListener("click", this.start);
    // handler.addEventListener("click", this.start.bind(this));
    handlerReset.addEventListener("click", this.reset);
    screenBtn.addEventListener("click", this.addScreenBlock);
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

      select.addEventListener("input", this.checkValues);
      input.addEventListener("input", this.checkValues);
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

  addTitle: function () {
    document.title = title.textContent;
  },

  /*клонирование элементов screen:*/
  addScreenBlock: function () {
    /*склонировать 1ый эл-т коллекции и поместить в переменную cloneScreen:*/
    const cloneScreen = screens[0].cloneNode(true);
    /*последний элемент коллекции поместить перед клонированным элементом: */
    screens[screens.length - 1].after(cloneScreen);
    appData.handlerDisabled();
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
        this.servicesPersent[label.textContent] = +input.value;
      }
    });
    /*аналогично перебору по доп.услугам в %%:*/
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    /*расчет количества экранов:*/
    for (let screen of this.screens) {
      this.screenNumber += +screen.count;
    }

    /*расчет стоимости экранов:*/
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    // appData.screenPrice = appData.screens.reduce(function (sum, screen) {
    //   return (sum += +screen.price);
    // }, 0);

    /*расчет стоимости доп.услуг:*/
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPersent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPersent[key] / 100);
    }
    /*расчет стоимости экранов с учетом доп.услуг:*/
    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    /*расчет стоимости с учетом отката:*/
    this.servicePersentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  /*вывод результатов Итого на экран:*/
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = +this.screenNumber;
    totalCountOther.value =
      appData.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePersentPrice;
  },

  /*после клика на Рассчитать кнопка заменяется на Сброс*/
  showStart: function () {
    handler.style = "display:none";
    handlerReset.style = "display:block;";
  },

  start: function () {
    appData.addScreens();
    appData.addServises();
    appData.addPrices();
    appData.showResult();
    appData.screensDisabled();
    appData.showStart();
    appData.logger();
  },

  /*Блок Сброс*/

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

  /*oчистка экранов*/
  clearScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      select.value = "";
      input.value = "";
    });
  },

  /*после клика на Сброс кнопка заменяется на Рассчитать*/
  showReset: function () {
    handler.style = "display:block";
    handlerReset.style = "display:none";
  },

  /*удаление клонированных экранов*/
  clearSkreenBlock: function () {
    screens.forEach((item, i) => {
      if (i !== 0) {
        item.remove();
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

  /*очистка результатов*/
  clearResult: function () {
    this.title = "";
    this.screens = [];
    this.screenPrice = 0;
    this.screenNumber = 0;
    this.adaptive = false;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePersentPrice = 0;
    this.servicesPersent = {};
    this.servicesNumber = {};
    total.value = "";
    totalCount.value = "";
    totalCountOther.value = "";
    fullTotalCount.value = "";
    totalCountRollback.value = "";
  },

  reset: function () {
    appData.showReset();
    appData.screensIncluded();
    appData.clearScreens();
    appData.clearCheckServises();
    appData.clearSkreenBlock();
    appData.clearResult();
    handler.removeAttribute("disabled");
    screens = document.querySelectorAll(".screen");
    inputTypeRange.value = 0;
    spanRangeValue.textContent = "0";
    appData.logger();
  },

  logger: function () {
    console.log(this.screenPrice);
    console.log(this.screenNumber);
    console.log(this.servicePricesPercent);
    console.log(this.servicePricesNumber);
    console.log(this.fullPrice);
  },
};
appData.init();
