import { Component } from '@angular/core';
import { IonicPage,AlertController, NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.module';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class Detail {
  categories: string[];
  expense:Expense;
  constructor(private navCtrl: NavController,
              private navParams: NavParams, 
              private alertCtrl: AlertController,
              private expenseService: ExpenseService) {

    this.categories = expenseService.categories;
    const expenseId = navParams.get('expenseId');
  this.expense ={
      date:'',
      amount:0,
      category:'',
      description:''
    };
  if(expenseId){
    expenseService.getExpense(expenseId)
    .then(expense => this.expense = expense);
  }
  
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }
  onSave(){
    if(this.expense.id){
      this.expenseService.updateExpense(this.expense);
    }
    else{
      this.expenseService.addExpense(this.expense);
    }
    
    this.navCtrl.pop();
}
  onTrash(){

    
  let alert = this.alertCtrl.create({
    title: 'Delete',
    message: `Are you sure you want to delete this expense: "${ this.expense.description }" ?`,
    buttons: [
      {text: 'Cancel'},
      {
        text: 'Delete',
        handler: () => {
              this.expenseService.removeExpense(this.expense.id);
              this.navCtrl.pop();
        }
      }
    ]
  });
  alert.present();


  }
}
