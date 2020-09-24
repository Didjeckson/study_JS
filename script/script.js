"use strict";

let start = document.getElementById('start'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  budgetMonthValue = document.querySelector('.budget_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  expensesTitle = document.querySelector('input.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'), ///сомневаюсь, но 
  //пусть будет dditionalExpenses
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  incomeItems = document.querySelectorAll('.income-items'),
  periodAmount = document.querySelector('.period-amount');
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isLetters = function (n) {
  return isNaN(parseFloat(n)) && n !== '' && n !== null;
};

let salaryAmountFinger = function (n) {
  /// не пригодилась, наверное
};

let appData = {
  expensesAmount: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    // appData.getExpensesMonth();
    appData.expensesAmount = appData.getExpensesMonth();
    appData.getIncome();

    // appData.getStatusIncome();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
    // console.log(budgetMonthValue);
  },
  startVerification: function () {
    if (salaryAmount.value === '') {
      console.log('button is disabled2');
      return start.style.disabled;
    } else {
      return appData.start(this);
    }
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = +appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    // periodAmount.addEventListener('change', appData.calcPeriod());
    incomePeriodValue.value = appData.calcPeriod();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item.value !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  ////////////////////////////
  CalcExpenses: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    return sum;
  },
  getExpensesMonth: function () {
    let sum1;

    sum1 = appData.CalcExpenses();
    appData.expensesMonth = sum1;
    return sum1;
  },
  ////////////////////////////
  getBudget: function () {
    appData.budgetDay = Math.floor(appData.budget / 30);
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    return appData.budgetMonth;
  },
  ///////////////////////////
  getTargetMonth: function () {
    return targetAmount.value / appData.getBudget();
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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  periodValue: function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = appData.calcPeriod();
  }
};
// salaryAmount.addEventListener('input', function () {
//   if (salaryAmount === '') {
//     return start.style.disabled;
//   } else {

//     return !start.style.disabled, appData.start();
//   }
// });
salaryAmount.addEventListener('input', function () {
  if (!isNumber(salaryAmount.value)) {
    console.log('button is disabled');
    return start.setAttribute('disabled', 'disabled');
  } else {
    console.log('button is undisabled');
    return start.removeAttribute('disabled');
  }
});
start.addEventListener('click', appData.startVerification);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.periodValue);
// periodSelect.addEventListener('mousemove', incomePeriodValue.value = appData.calcPeriod());
// periodSelect.addEventListener('mousemove', appData.showResult);


// let aimPeriod = appData.getTargetMonth();
// if (aimPeriod >= 0) {
//   console.log("Цель будет достигнута за: " + Math.ceil(aimPeriod) + " месяцев");
// } else {
//   console.log('Цель не будет достигнута');
// }


/*
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
}*/