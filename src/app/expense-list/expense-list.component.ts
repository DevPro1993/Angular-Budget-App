import { Transaction } from './../models/transaction.model';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
}) 
export class ExpenseListComponent implements OnInit {

  expenseArray: Transaction[] = [];

  constructor(private trasactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.trasactionsService.expenseListChanged.subscribe(data => {
      this.expenseArray = data;
    })
  }

  // Get the id passed on by expense item component and call a method to delete it in trasnactions service
  onIdDeleted(id: number) {
    this.trasactionsService.deleteExpense(id);
  }

  onItemEdited(newExpenseData: {newExpense: string, newAmount: number, id: number}) {
    this.trasactionsService.replaceExpenseItem(newExpenseData);
  }

}
