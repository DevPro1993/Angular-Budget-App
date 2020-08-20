import { Transaction } from 'src/app/models/transaction.model';
import { TransactionsService } from './../transactions.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  totalIncome: number = 0;
  totalExpense: number = 0;
  budget: number = 0;

  @ViewChild('budgetInput') budgetInput: ElementRef;



  constructor(private transactionsService: TransactionsService) {
  }

  ngOnInit(): void {

    this.transactionsService.incomeListChanged.subscribe((data: Transaction[]) => {
      this.totalIncome = 0;
      data.forEach(transaction => {
        this.totalIncome += transaction.getAmount();
      });
    })

    this.transactionsService.expenseListChanged.subscribe((data: Transaction[]) => {
      this.totalExpense = 0;
      data.forEach(transaction => {
        this.totalExpense += transaction.getAmount();
      });
    });

    this.transactionsService.budgetChanged.subscribe((data: number) => {
      this.budget = data;
    })
  }

  getColor() {
    if (this.budget < 0) {
      return 'rgba(189, 40, 14, 0.85)';
    } else if (this.budget > 0) {
      return 'rgba(30, 119, 18, 0.85)';
    } else {
      return 'black';
    }
  }

  setBudget() {
    this.transactionsService.budgetUpdated(+this.budgetInput.nativeElement.value);
    this.budgetInput.nativeElement.value = '';
  }

  resetApp() {
    this.transactionsService.resetApp();
  }


}
