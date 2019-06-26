import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Detail } from '../detail/detail';
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.module';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses:Expense[];
  constructor(private navCtrl: NavController, 
              private expenseService: ExpenseService) {

}
ionViewWillEnter(){
   this.expenseService.getExpenses()
  .then(expenses => this.expenses = expenses);

}
onItemClick(expense){
  console.log('item clicked:', expense);
  this.navCtrl.push(Detail,{
    expenseId:expense.id 
  });
}
onAddClick(){
  console.log('add clicked');
  this.navCtrl.push(Detail);
}

}
