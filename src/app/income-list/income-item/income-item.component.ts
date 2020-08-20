import { NgForm } from '@angular/forms';
import { Transaction } from './../../models/transaction.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-income-item',
  templateUrl: './income-item.component.html',
  styleUrls: ['./income-item.component.scss']
})
export class IncomeItemComponent implements OnInit {

  @Input() incomeItem: Transaction;

  @Output() incomeIdDeleted = new EventEmitter<number>();

  @Output() incomeItemEdited = new EventEmitter<{newIncome: string, newAmount: number, id: number}>();

  @ViewChild('f') form: NgForm;

  newIncomeData = {
    newIncome: '', 
    newAmount: 0,
    id: 0
  }

  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  // When delete button is clicked, this function is executed and incomeDeleted event is emitted
  deleteIncomeItem() {
    this.incomeIdDeleted.emit(this.incomeItem.getId())
  }

  onSubmit() {
    this.newIncomeData.newIncome = this.form.value.newIncome;
    this.newIncomeData.newAmount = this.form.value.newAmount;
    this.newIncomeData.id = this.incomeItem.getId();

    if (this.form.valid) {
      this.incomeItemEdited.emit(this.newIncomeData);
    }
  }



}
