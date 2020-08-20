import { Transaction } from './../models/transaction.model';
import { TransactionsService } from './../transactions.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit {

  incomeArray: Transaction[];

  constructor(private trasactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.trasactionsService.incomeListChanged.subscribe(data => {
      this.incomeArray = data;
    })
  }

  // Get the id passed on by income item component and call a method to delete it in trasnactions service

  onIdDeleted(id: number) {
    this.trasactionsService.deleteIncome(id);
  }

  onItemEdited(newIncomeData: {newIncome: string, newAmount: number, id: number}) {
    this.trasactionsService.replaceIncomeItem(newIncomeData);
  }

}
