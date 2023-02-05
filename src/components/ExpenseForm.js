import React, {useState} from 'react';
import './ExpenseForm.css'

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState();
    const [enteredAmount, setEnteredAmount] = useState();
    const [enteredDate, setEnteredDate] = useState();

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const titleChangeHandlerClick = () =>{
        if(props.title) {setEnteredTitle(props.title);setEnteredAmount(props.amount); setEnteredDate(props.date); props.setTitle(); props.setAmount(); props.setDate();}
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
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
       else if(enteredAmount < 1){
            alert("Minimum value is 1");
            return;
       }
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
                        </div>
                        <div className='form-control'>
                            <label>Amount</label>
                            <input type='text' value={props.amount? props.amount : enteredAmount} onChange={amountChangeHandler} onClick={amountChangeHandlerClick}/>
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