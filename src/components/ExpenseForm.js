import React, {useState} from 'react';
import './ExpenseForm.css'

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    const submitHandler = (event) => {
       event.preventDefault(); 
       if(!enteredTitle || !enteredAmount || !enteredDate){
        alert("Please fill all the details");
        return;
       }
       const expenseData = {
        title : enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate)
    }
    console.log(expenseData);
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
                            <input type='text' value={enteredTitle}onChange={titleChangeHandler}/>
                        </div>
                        <div className='form-control'>
                            <label>Amount</label>
                            <input type='text' value={enteredAmount}onChange={amountChangeHandler}/>
                        </div>
                        <div className='form-control'>
                            <label>Date</label>
                            <input type='date' value={enteredDate}onChange={dateChangeHandler}/>
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