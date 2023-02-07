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
  const[title, setTitle] = useState();
  const[amount, setAmount] = useState();
  const[date, setDate] = useState();
  const[tExpense, setTExpense] = useState(0);
  const saveExpenseDataHandler = (enteredExpenseData) => {
    let updatedExpenseList = [enteredExpenseData, ...newExpenseList];
    setExpenseList(updatedExpenseList);
  }
  let items = [];
  let totalExpense = 0;
  const updateExpense = (id) =>{
    items = JSON.parse(localStorage.getItem('items'));
    let item = items.filter((item) => item.idx === id);
    console.log("de",items);
    setTitle(item[0].title);
    setAmount(item[0].amount);
    setDate(item[0].date);
    setTimeout(deleteExpense(id), 10000);
  }

  useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(newExpenseList));
    let items = JSON.parse(localStorage.getItem('items'));
    if(!items) return;
    for(let i = 0; i < items.length; i++){
      totalExpense += JSON.parse(items[i].amount);
      totalExpense = Math.round(totalExpense * 100) / 100;
    }
  setTExpense(totalExpense);
  },[newExpenseList, tExpense, title]);

  const deleteExpense = (id) => {
    let items = newExpenseList;
    setExpenseList(items.filter((item) => item.idx !== id));
  }
  
  return (
    <div className='app'>
      <Title/>
      {tExpense && <h2 style={{marginTop:"10rem", color:"282828", textAlign:"right", fontSize:"3rem", marginRight:"2rem"}}>Total Expense (Rs) <span style={{color:"red"}}>{tExpense}</span></h2>}
      <ExpenseForm
        title={title}
        amount={amount}
        date={date}
        setTitle={setTitle}
        setAmount={setAmount}
        setDate={setDate}
        onSaveExpenseData={saveExpenseDataHandler}
      />
      
      {
        newExpenseList.map(
          (expense) => ( 
              <ExpenseItem
              key={i++}
              idx = {expense.idx}
              date = {expense.date}
              title = {expense.title}
              amount = {expense.amount}
              deleteExpense = {deleteExpense}
              updateExpense = {updateExpense}
          />
        )
      )
    }
    </div>
  );
}

export default App;
