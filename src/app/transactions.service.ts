import { Transaction } from './models/transaction.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class TransactionsService {

  constructor() { }

  // Store an array of transactions here

  incomeItemList: Transaction[] = [];
  expenseItemList: Transaction[] = [];

  // Budget value set
  budget: number = 0;

  // Max ID values allocated. The next item will have a +1 ID value

  incomeItemMaxId: number = 0;
  expenseItemMaxId: number = 0;

  // Event emitter when a new transaction is added
  incomeListChanged = new Subject<Transaction[]>();
  expenseListChanged = new Subject<Transaction[]>();
  budgetChanged = new Subject<number>();

  // Push a new income transaction to the array and clear the input fields

  pushIncome(description: string, amount: number) {
    this.incomeItemMaxId++;
    const id = this.incomeItemMaxId;
    const newIncomeItem = new Transaction(id, amount, description);
    this.addIncomeToBudget(newIncomeItem.getAmount());
    this.incomeItemList.push(newIncomeItem);
    this.incomeListChanged.next(this.incomeItemList);
  }

  // Push a new expense transaction to the array and clear the input fields

  pushExpense(description: string, amount: number) {
    this.expenseItemMaxId++;
    const id = this.expenseItemMaxId;
    const newExpenseItem = new Transaction(id, amount, description);
    this.substractExpenseFromBudget(newExpenseItem.getAmount());
    this.expenseItemList.push(newExpenseItem);
    this.expenseListChanged.next(this.expenseItemList);
  }

  // deletes income item from expenseList array

  deleteIncome(id: number) {
    let index: number;
    this.incomeItemList.forEach((incomeItem, i) => {
      if (incomeItem.getId() === id) {
        index = i;
      }
    });
    this.deleteIncomeFromBudget(this.incomeItemList[index].getAmount())
    this.incomeItemList.splice(index, 1);
    this.incomeListChanged.next(this.incomeItemList);
  }

  // deletes expense item from expenseList array

  deleteExpense(id: number) {
    let index: number;
    this.expenseItemList.forEach((expenseItem, i) => {
      if (expenseItem.getId() === id) {
        index = i;
      }
    });
    this.deleteExpenseFromBudget(this.expenseItemList[index].getAmount())
    this.expenseItemList.splice(index, 1);
    this.expenseListChanged.next(this.expenseItemList);
  }

  // Set budget value

  budgetUpdated(amount: number) {
    this.budget = amount;
    this.budgetChanged.next(this.budget);
  }

  // Add income to budget
  addIncomeToBudget(incomeAmount: number) {
    this.budget += incomeAmount;
    this.budgetChanged.next(this.budget);
  }

  // Remove income to budget
  deleteIncomeFromBudget(incomeAmount: number) {
    this.budget -= incomeAmount;
    this.budgetChanged.next(this.budget);
  }

  // Subtract expense from budget
  substractExpenseFromBudget(expenseAmount: number) {
    this.budget -= expenseAmount;
    this.budgetChanged.next(this.budget);
  }

  // Remove expense from budget
  deleteExpenseFromBudget(expenseAmount: number) {
    this.budget += expenseAmount;
    this.budgetChanged.next(this.budget);
  }

  //Replace Income item on editing
  replaceIncomeItem(newIncomeData: { newIncome: string, newAmount: number, id: number }) {
    let id = newIncomeData.id;
    this.incomeItemList.forEach((transaction, index) => {
      if (transaction.getId() === id) {
        this.deleteIncomeFromBudget(this.incomeItemList[index].getAmount());
        this.addIncomeToBudget(newIncomeData.newAmount);
        this.incomeItemList.splice(index, 1, new Transaction(newIncomeData.id, newIncomeData.newAmount, newIncomeData.newIncome));
      }
    });
    this.incomeListChanged.next(this.incomeItemList);
  }

  //Replace Income item on editing
  replaceExpenseItem(newExpenseData: { newExpense: string, newAmount: number, id: number }) {
    let id = newExpenseData.id;
    this.expenseItemList.forEach((transaction, index) => {
      if (transaction.getId() === id) {
        this.deleteExpenseFromBudget(this.expenseItemList[index].getAmount());
        this.substractExpenseFromBudget(newExpenseData.newAmount);
        this.expenseItemList.splice(index, 1, new Transaction(newExpenseData.id, newExpenseData.newAmount, newExpenseData.newExpense));
      }
    });
    this.expenseListChanged.next(this.expenseItemList);
  }

  // Reset App

  resetApp() {
    this.incomeItemList = [];
    this.expenseItemList = [];
    this.budget = 0;
    this.incomeItemMaxId = 0;
    this.expenseItemMaxId = 0;

    this.incomeListChanged.next(this.incomeItemList);
    this.expenseListChanged.next(this.expenseItemList);
    this.budgetChanged.next(this.budget);
  }

}
