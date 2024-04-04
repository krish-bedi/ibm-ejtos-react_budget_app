import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { dispatch, expenses, budget, currency } = useContext(AppContext);  // Include expenses in the destructuring

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('Add');

    const currencySymbols = {
        GBP: "£",
        USD: "$",
        EUR: "€",
        INR: "₹"
    };

    const submitEvent = () => {
        const numericCost = parseInt(cost, 10);
        const totalExpenses = expenses.reduce((total, expense) => total + expense.cost, 0);
        const currentRemaining = budget - totalExpenses;

        if (action === 'Add' && numericCost > currentRemaining) {
            alert(`The value cannot exceed remaining funds ${currencySymbols[currency]}${currentRemaining}`);
            return;
        }

        const expense = {
            name,
            cost: numericCost,
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        setName('');
        setCost('');
        setAction('Add');
    };

    return (
        <>
        <h4>Change Allocation</h4>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" value={name} onChange={(event) => setName(event.target.value)}>
                <option defaultValue>Choose...</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Admin">Admin</option>
            </select>

            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
            </div>
            <select className="custom-select" id="inputGroupSelect02" value={action} onChange={(event) => setAction(event.target.value)}>
                <option value="Add">Add</option>
                <option value="Reduce">Reduce</option>
            </select>

            <div className="input-group-prepend">
                <span className="input-group-text">{currencySymbols[currency]}</span>
            </div>
            <input
                type='number'
                value={cost}
                onChange={(event) => setCost(event.target.value)}
                className="form-control"
            />

            <button className="btn btn-primary" onClick={submitEvent}>
                Save
            </button>
        </div>
        </>
    );
};

export default AllocationForm;
