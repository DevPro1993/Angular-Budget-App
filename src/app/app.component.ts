import { TransactionsService } from './transactions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TransactionsService]
})
export class AppComponent {
  title = 'budget-app';
}
