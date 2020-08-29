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

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",
      'мясо, сало, каша, какао');
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  }
};




let budgetDay;

function getExpensesMonth() {

  let sum = 0;

  for (let i = 0; i < 2; i++) {

    appData.expenses[i] = prompt("Введите обязательную статью расходов?", 'продукты');

    let preSum = prompt("Во сколько это обойдётся?");

    while (!isNumber(preSum)) {
      preSum = prompt("Во сколько это обойдётся?");
    }

    sum += +preSum;
  }

  return sum;
}

let expensesAmount = getExpensesMonth();

// console.log('Обязательные затраты в месяц: ', getExpensesMonth());

let accumulatedMonth = function getAccumulatedMonth() {
  return money - expensesAmount;
};

// console.log('Профит в месяц: ', accumulatedMonth());

function getTargetMonth() {
  return appData.mission / accumulatedMonth();
}

// console.log('Вам осталось копить: ', getTargetMonth()  + ' месяцев');

function getStatusIncome() {
  if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
  } else if (600 <= budgetDay && budgetDay < 1200) {
    console.log("У вас средний уровень дохода");
  } else if (0 <= budgetDay && budgetDay < 600) {
    console.log("К сожалению, у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    console.log("Что-то пошло не так");
  }
}

console.log(typeof money);
console.log(typeof appData.income);
console.log(typeof appData.deposit);

console.log('Расходы на месяц: ' + expensesAmount);

let aimPeriod = getTargetMonth();
if (aimPeriod >= 0) {
  console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");
} else {
  console.log('Цель не будет достигнута');
}
budgetDay = accumulatedMonth() / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

getStatusIncome();