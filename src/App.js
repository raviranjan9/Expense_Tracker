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
  let i = 0;
  const[newExpenseList, setExpenseList] = useState(getItems());
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const updatedExpenseList = [enteredExpenseData, ...newExpenseList];
    setExpenseList(updatedExpenseList);
  }
  useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(newExpenseList))
  },[newExpenseList]);
  return (
    <div className='app'>
      <Title/>
      <ExpenseForm
        onSaveExpenseData = {saveExpenseDataHandler}
      />
      {
        newExpenseList.map(
          (expense) => (
              <ExpenseItem
              key = {i++}
              date = {expense.date}
              title = {expense.title}
              amount = {expense.amount}
          />
        )
      )
    }
    </div>
  );
}

export default App;
