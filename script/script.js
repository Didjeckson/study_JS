let money = 43000,
  income = "freelance",
  addExpenses = "courses, skills, car",
  deposit = true,
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

let budgetDay = money / 30;
console.log(budgetDay);
