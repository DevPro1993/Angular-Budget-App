import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {
 
  @Input() expenseItem: Transaction; 

  @Output() expenseIdDeleted = new EventEmitter<number>()

  @Output() expenseItemEdited = new EventEmitter<{newExpense: string, newAmount: number, id: number}>();

  @ViewChild('form') f: NgForm;

  newExpenseData = {
    newExpense: '', 
    newAmount: 0,
    id: 0
  }

  editMode: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  // When delete button is clicked, this function is executed and expenseIdDeleted event is emitted
  deleteExpenseItem() {
    this.expenseIdDeleted.emit(this.expenseItem.getId())
  }

  onSubmit() {
    console.log(this.f)
    this.newExpenseData.newExpense = this.f.value.newExpense;
    this.newExpenseData.newAmount = this.f.value.newAmount;
    this.newExpenseData.id = this.expenseItem.getId();

    if (this.f.valid) {
      this.expenseItemEdited.emit(this.newExpenseData);
    }
  }



}
