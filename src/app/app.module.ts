import { TransactionsService } from './transactions.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { InputComponent } from './input/input.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseItemComponent } from './expense-list/expense-item/expense-item.component';
import { IncomeItemComponent } from './income-list/income-item/income-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    InputComponent,
    IncomeListComponent,
    ExpenseListComponent,
    ExpenseItemComponent,
    IncomeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TransactionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
