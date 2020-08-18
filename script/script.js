"use strict";

let money = prompt("Ваш месячный доход?", 40000),
  income = "freelance",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую", 'мясо, сало, каша, какао'
  ),
  deposit = confirm("Есть ли у вас депозит в банке?", true),
  expenses1 = prompt("Введите обязательную статью расходов?", 'продукты'),
  expenses2 = prompt("Введите обязательную статью расходов?", 'канцелярия'),
  amount1 = +prompt("Во сколько это обойдётся?", 15000),
  amount2 = +prompt("Во сколько это обойдётся?", 5000),
  mission = 100000,
  period = 12;
let budgetDay;

function getExpensesMonth() {
  return expenses1 + ', ' + expenses2;
}

// console.log('Обязательные затраты в месяц: ', getExpensesMonth());

let accumulatedMonth = function getAccumulatedMonth() {
  return money - (amount1 + amount2);
};

// console.log('Профит в месяц: ', accumulatedMonth());

function getTargetMonth() {
  return mission / accumulatedMonth();
}

// console.log('Вам осталось копить: ', getTargetMonth()  + ' месяцев');

function getStatusIncome() {
  if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
  } else if (600 <= budgetDay < 1200) {
    console.log("У вас средний уровень дохода");
  } else if (0 <= budgetDay < 600) {
    console.log("К сожалению, у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    console.log("Что-то пошло не так");
  }
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(getExpensesMonth());

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(", ");
console.log(addExpenses);

let aimPeriod = getTargetMonth();
console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");

budgetDay = accumulatedMonth() / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

getStatusIncome();