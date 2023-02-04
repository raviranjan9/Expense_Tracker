
import './ExpenseItem.css'

const ExpenseItem = (props) => {
    const date = new Date(props.date);
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();
    return (
        <div className='expense-item'>
            <div className='expense-item-container'>
                <div className='expense-item-date'>
                        <div className='expense-item-date-day'>{day}</div>
                        <div className='expense-item-date-month'>{month}</div>
                        <div className='expense-item-date-year'>{year}</div>
                </div>
                <div className='expense-item-title'>{props.title}
                </div>
                <div className='expense-item-amount'>Rs {props.amount}
                </div>
                <div className='icons'>
                    <span class="material-symbols-outlined _icons" onClick={() => props.deleteExpense(props.idx)}>
                        delete
                    </span>
                    {/* <span class="material-symbols-outlined" onClick={() => props.updateExpense(props.idx)}>
                        edit
                    </span> */}
                </div>
            </div>
        </div>
    );
}

export default ExpenseItem;