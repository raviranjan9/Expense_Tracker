import React, {useState} from 'react';
import './ExpenseForm.css'

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState();
    const [enteredAmount, setEnteredAmount] = useState();
    const [enteredDate, setEnteredDate] = useState();

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        let elem = document.getElementById('title');
        if(event.target.value.length > 30) elem.innerText = "Title must be less than 30 characters";
        else elem.innerText = "";
    }
    const titleChangeHandlerClick = () =>{
        if(props.title) {setEnteredTitle(props.title);setEnteredAmount(props.amount); setEnteredDate(props.date); props.setTitle(); props.setAmount(); props.setDate();}
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
        let elem = document.getElementById('amount');
        if(event.target.value > 99999999999999999) return elem.innerText = "Amount must be less than 99999999999999999";
        else elem.innerText = "";
    }
    const amountChangeHandlerClick = () =>{
        if(props.title) {setEnteredAmount(props.amount); setEnteredTitle(props.title); setEnteredDate(props.date);  props.setTitle(); props.setAmount(); props.setDate();}
    }
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }
    const dateChangeHandlerClick = () =>{
        if(props.date) {setEnteredAmount(props.amount); setEnteredTitle(props.title); setEnteredDate(props.date); props.setTitle(); props.setAmount(); props.setDate();}
    }

    const submitHandler = (event) => {
       event.preventDefault(); 
       if(!enteredTitle || !enteredAmount || !enteredDate){
        alert("Please fill all the details");
        return;
       }
       else if(enteredTitle.length > 30) return;
       else if(enteredAmount > 99999999999999999) return;

       const expenseData = {
        idx : new Date().getTime(),
        title : enteredTitle,
        amount: enteredAmount,
        date: enteredDate
    }
    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    }
    return (
        <div className='expense-form'>
            <div className='form-container'>
                <form onSubmit={submitHandler}>
                    <div className='form-control'>
                            <label>Title</label>
                            <input type='text' value={props.title? props.title : enteredTitle} onChange={titleChangeHandler} onClick={titleChangeHandlerClick}/>
                            <p id="title" style={{color: 'red'}}></p>
                        </div>
                        <div className='form-control'>
                            <label>Amount</label>
                            <input type='number' min='1' step='any' value={props.amount? props.amount : enteredAmount} onChange={amountChangeHandler} onClick={amountChangeHandlerClick}/>
                            <p id="amount" style={{color: 'red'}}></p>
                        </div>
                        <div className='form-control'>
                            <label>Date</label>
                            <input type='date' value={props.date? props.date : enteredDate} onChange={dateChangeHandler} onClick={dateChangeHandlerClick}/>
                        </div>
                    <div className='btn'>
                        <button type="submit">Add Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExpenseForm;