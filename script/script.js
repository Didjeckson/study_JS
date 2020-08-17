"use strict";

let money = prompt("Ваш месячный доход?"),
  income = "freelance",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  expenses1 = prompt("Введите обязательную статью расходов?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  amount1 = +prompt("Во сколько это обойдётся?"),
  amount2 = +prompt("Во сколько это обойдётся?"),
  mission = 100000,
  period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");

console.log("Цель заработать " + mission + " гривен");

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(", ");
console.log(addExpenses);

let budgetMonth = amount1 + amount2;
console.log("Бюджет на месяц " + budgetMonth);

let aimPeriod = mission / (money - budgetMonth);
console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");

let budgetDay = budgetMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (600 <= budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (0 <= budgetDay < 600) {
  console.log("К сожалению, у вас уровень дохода ниже среднего");
} else if (budgetMonth < 0) {
  console.log("Что-то пошло не так");
}
