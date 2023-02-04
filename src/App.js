import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import ExpenseItem from './components/ExpenseItem';
import ExpenseForm from './components/ExpenseForm';
import Title from './components/Title';

const getItems = () =>{
  let items = localStorage.getItem("items");
  if(items === []){
    return [];
  }
  else if(items !== null){
    return JSON.parse(items);
  }
  return [];
}

const App = () => {
  const[newExpenseList, setExpenseList] = useState(getItems());
  const[tExpense, setTExpense] = useState(0);
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const updatedExpenseList = [enteredExpenseData, ...newExpenseList];
    setExpenseList(updatedExpenseList);
  }
  
  let totalExpense = 0;
  useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(newExpenseList));
    let items = JSON.parse(localStorage.getItem('items'));
      for(let i = 0; i < items.length; i++){
        totalExpense += JSON.parse(items[i].amount);
    }
  setTExpense(totalExpense);
  },[newExpenseList, tExpense]);

  const deleteExpense = (id) => {
    let items = JSON.parse(localStorage.getItem('items'));
    setExpenseList(items.filter((item) => item.idx !== id));
  }
  return (
    <div className='app'>
      <Title/>
      {tExpense && <h2 style={{marginTop:"10rem", textAlign:"right", fontSize:"3rem", marginRight:"2rem"}}>Total Expense Rs {tExpense}</h2>}
      <ExpenseForm
        onSaveExpenseData = {saveExpenseDataHandler}
      />
      {
        newExpenseList.map(
          (expense) => (
              <ExpenseItem
              idx = {expense.idx}
              date = {expense.date}
              title = {expense.title}
              amount = {expense.amount}
              deleteExpense = {deleteExpense}
          />
        )
      )
    }
    </div>
  );
}

export default App;
