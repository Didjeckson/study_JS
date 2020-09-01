"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isLetters = function (n) {
  return isNaN(parseFloat(n)) && n !== '' && n !== null;
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 50000);
    } while (!isNumber(money));

  };

start();

let appData = {
  expensesAmount: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник зароботка?')) {
      let itemIncome = 0;
      let cashIncome = 0;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      }
      while (!isLetters(itemIncome));

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 10000);
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",
      'мясо, сало, каша, какао');
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    if (confirm("Есть ли у вас депозит в банке?")) {
      appData.deposit = true;
      appData.getInfoDeposit();
    }

    for (let i = 0; i < 2; i++) {
      let point = 0,
        meaning = 0;

      do {
        point = prompt("Введите обязательную статью расходов?", 'продукты');
      }
      while (!isLetters(point));

      do {
        meaning = prompt("Во сколько это обойдётся?", 10500);
      } while (!isNumber(meaning));

      appData.expenses[point] = meaning;

    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  ////////////////////////////
  getExpensesMonth: function () {

    let sum = 0;

    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }

    appData.expensesMonth = sum;

    return sum;
  },
  ////////////////////////////
  getBudget: function () {
    appData.budgetDay = Math.floor(appData.budget / 30);
    appData.budgetMonth = appData.budget;
    return appData.budgetMonth;
  },
  ///////////////////////////
  getTargetMonth: function () {
    return appData.mission / appData.getBudget();
  },
  //////////////////////////
  getStatusIncome: function () {
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();

appData.expensesAmount = appData.getExpensesMonth();

console.log('Расходы на месяц: ' + appData.expensesAmount);

let aimPeriod = appData.getTargetMonth();
if (aimPeriod >= 0) {
  console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");
} else {
  console.log('Цель не будет достигнута');
}

appData.getStatusIncome();

console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ':' + appData[key]);
}

let stringForAddExpenses = '';
for (let key in appData.addExpenses) {

  let string = '';

  string = appData.addExpenses[key];


  let firstLetter = '';
  firstLetter = string[0];

  let stringClone = '';

  for (let i = 1; i < string.length; i++) {
    stringClone += string[i];
  }

  string.slice(1);

  if (+key === appData.addExpenses.length - 1) {
    stringForAddExpenses += firstLetter.toUpperCase() + stringClone;
    console.log(stringForAddExpenses);
  } else {
    stringForAddExpenses += firstLetter.toUpperCase() + stringClone + ', ';
  }
}