import { TransactionsService } from './../transactions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  description: string;
  amount: string;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
  }

  // function trigerred upon clicking the add income button

  addIncome() {
    if (this.description && this.amount) {
      this.transactionsService.pushIncome(this.description, parseFloat(this.amount));
      this.description = '';
      this.amount = '';
    } else {
      alert('Please enter a value in the description and amount fields')
    }

  }

  // function trigerred upon clicking the add expense button

  addExpense() {
    if (this.description && this.amount) {
      this.transactionsService.pushExpense(this.description, parseFloat(this.amount));
    this.description = '';
    this.amount = '';
    } else {
      alert('Please enter a value in the description and amount fields')
    }
    
  }

  // reset input fields

  resetFields() {
    this.description = '';
    this.amount = '';
  }

}
