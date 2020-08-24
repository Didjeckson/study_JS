"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "freelance",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую", 'мясо, сало, каша, какао'
  ),
  deposit = confirm("Есть ли у вас депозит в банке?", true),
  expenses = [],
  // amount1 = +prompt("Во сколько это обойдётся?", 15000),
  // amount2 = +prompt("Во сколько это обойдётся?", 5000),
  mission = 100000,
  period = 12;
let budgetDay;

let start = function () {

  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));

};
start();

function getExpensesMonth() {

  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt("Введите обязательную статью расходов?", 'продукты');


    sum += +prompt("Во сколько это обойдётся?", 15000);
  }

  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();

// console.log('Обязательные затраты в месяц: ', getExpensesMonth());

let accumulatedMonth = function getAccumulatedMonth() {
  return money - expensesAmount;
};

// console.log('Профит в месяц: ', accumulatedMonth());

function getTargetMonth() {
  return mission / accumulatedMonth();
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
console.log(typeof income);
console.log(typeof deposit);

console.log('Расходы на месяц: ' + expensesAmount);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(", ");
console.log(addExpenses);

let aimPeriod = getTargetMonth();
console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");

budgetDay = accumulatedMonth() / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

getStatusIncome();