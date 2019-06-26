import { Expense } from './expense.module';
import uuidV4 from 'uuid/v4';
import Dexie from 'dexie';

export class ExpenseService extends Dexie{
      expenses: Dexie.Table<Expense, string>;
      categories = ['Food','Travel','Other'];
     
     constructor(){
       super('expense_tracker');
       this.version(1).stores({
          expenses: 'id, date'
       });
     }
  
  
getExpense(expenseId:string):Dexie.Promise<Expense>{
  return this.expenses.get(expenseId);

 }
 getExpenses(): Dexie.Promise<Expense []>{
   return this.expenses.toArray();
 }

 updateExpense(expense: Expense){
  this.expenses.update(expense.id, expense);
}
  addExpense(expense:Expense){
    expense.id = uuidV4();
    this.expenses.add(expense);
  }
  removeExpense(expenseId: string){
    this.expenses.delete(expenseId);
  }
  /*private storeExpenses(){

    localStorage.setItem('expenses',JSON.stringify(this.expenses));
  }
  private loadExpenses(){
    const expenses = localStorage.getItem('expenses');
    if(expenses){
      return JSON.parse(expenses);
    }
    else{
      return [];
    }
  }*/
}