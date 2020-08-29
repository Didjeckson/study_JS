"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));

  };

start();

let expensesAmount = 0;

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"
      /*,
            'мясо, сало, каша, какао'*/
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let point = prompt("Введите обязательную статью расходов?", 'продукты'),
        meaning = prompt("Во сколько это обойдётся?");

      while (!isNumber(meaning)) {
        meaning = prompt("Во сколько это обойдётся?");
      }

      appData.expenses[point] = meaning;

    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  ////////////////////////////
  getExpensesMonth: function getExpensesMonth1() {

    let sum = 0;

    for (let i = 0; i < 2; i++) {

      appData.expenses[i] = prompt("Введите обязательную статью расходов?", 'продукты');

      let meaning = prompt("Во сколько это обойдётся?");

      while (!isNumber(meaning)) {
        meaning = prompt("Во сколько это обойдётся?");
      }

      sum += +meaning;
    }

    return sum;
  },
  ////////////////////////////
  accumulatedMonth: function getAccumulatedMonth() {
    return money - expensesAmount;
  },
  ///////////////////////////
  getTargetMonth: function getTargetMonth() {
    return appData.mission / appData.accumulatedMonth();
  },
  //////////////////////////
  getStatusIncome: function getStatusIncome() {
    if (appData.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (600 <= appData.budgetDay && appData.budgetDay < 1200) {
      console.log("У вас средний уровень дохода");
    } else if (0 <= appData.budgetDay && appData.budgetDay < 600) {
      console.log("К сожалению, у вас уровень дохода ниже среднего");
    } else if (appData.budgetDay < 0) {
      console.log("Что-то пошло не так");
    }
  },
};

appData.asking();

expensesAmount = appData.getExpensesMonth();

console.log('Расходы на месяц: ' + expensesAmount);

let aimPeriod = appData.getTargetMonth();
if (aimPeriod >= 0) {
  console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");
} else {
  console.log('Цель не будет достигнута');
}
appData.budgetDay = appData.accumulatedMonth() / 30;
console.log("Бюджет на день: " + Math.floor(appData.budgetDay));

appData.getStatusIncome();

console.log(appData.expenses);