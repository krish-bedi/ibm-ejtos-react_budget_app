import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);

    const currencySymbols = {
        GBP: "£",
        USD: "$",
        EUR: "€",
        INR: "₹"
    };

    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
    };

    const handleBudgetSubmit = () => {
        const numericBudget = parseInt(newBudget, 10);

        if (numericBudget < expenses.reduce((total, item) => total + item.cost, 0)) {
            alert("You cannot reduce the budget value lower than the spending");
            return;
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: numericBudget
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currencySymbols[currency]}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                onBlur={handleBudgetSubmit}
            />
        </div>
    );
};

export default Budget;
