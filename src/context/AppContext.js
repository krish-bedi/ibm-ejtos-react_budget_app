import React, { createContext, useReducer } from 'react';

// Define the reducer function
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const existingExpenseIndex = state.expenses.findIndex(expense => expense.name === action.payload.name);
            let updatedExpenses;
            if (existingExpenseIndex >= 0) {
                // Expense exists, update it
                updatedExpenses = state.expenses.map((expense, index) => {
                    if (index === existingExpenseIndex) {
                        return { ...expense, cost: expense.cost + action.payload.cost };
                    }
                    return expense;
                });
            } else {
                // Expense does not exist, add it
                updatedExpenses = [...state.expenses, action.payload];
            }
            return {
                ...state,
                expenses: updatedExpenses
            };


        case 'RED_EXPENSE':
            const reducedExpenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name) {
                    return { ...expense, cost: expense.cost - action.payload.cost };
                }
                return expense;
            });
            return {
                ...state,
                expenses: reducedExpenses
            };

        case 'DELETE_EXPENSE':
            const filteredExpenses = state.expenses.filter(expense => expense.name !== action.payload.name);
            return {
                ...state,
                expenses: filteredExpenses
            };

        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload
            };

        case 'CHG_CURRENCY':
            return {
                ...state,
                currency: action.payload
            };
        

        default:
            return state;
    }
};

// Initial state for the context
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: 'GBP'
};

// Create the context
export const AppContext = createContext(initialState);

// Define the provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
