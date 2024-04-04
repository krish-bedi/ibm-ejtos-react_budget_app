import React, { useContext, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider, AppContext } from './context/AppContext';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import ExpenseItem from './components/ExpenseItem';
import AllocationForm from './components/AllocationForm';

const CurrencySelector = () => {
    const { dispatch } = useContext(AppContext);
    const defaultCurrency = 'GBP';  // Set default currency
    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

    const currencyOptions = {
        GBP: "£ Pound",
        USD: "$ Dollar",
        EUR: "€ Euro",
        INR: "₹ Rupee"
    };

    const changeCurrency = (event) => {
        dispatch({ type: 'CHG_CURRENCY', payload: event.target.value });
        setSelectedCurrency(event.target.value);
    };

    return (
        <select 
            onChange={changeCurrency} 
            value={selectedCurrency}
            style={{ background: 'lightgreen' }}
        >
            {Object.entries(currencyOptions).map(([code, label]) => (
                <option key={code} value={code}>{code === selectedCurrency ? `Currency (${label})` : label}</option>
            ))}
        </select>
    );
};







const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                <CurrencySelector />
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budget />
                    </div>
                    <div className='col-sm'>
                        <Remaining />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal />
                    </div>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                    <div className='col-sm'>
                        <ExpenseItem />
                    </div>
                    <div className='col-sm'>
                        <AllocationForm />
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;
