import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';
    const remainingAmount = budget - totalExpenses;

    return (
        <div className={`alert ${alertType}`}>
            <span>Remaining: {currency === 'GBP' ? '£' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'}{remainingAmount}</span>
        </div>
    );
};

export default Remaining;
