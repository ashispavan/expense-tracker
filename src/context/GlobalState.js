import React, { createContext, useReducer, useEffect} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    transactions: []
};

//Create context

export const GlobalContext = createContext(initialState);

//Provider Component

export const GlobalProvider = ({children}) => {
    const localState = JSON.parse(localStorage.getItem("state"));
    const [state, dispatch] = useReducer(AppReducer, localState || initialState);
    
    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state));
    }, [state]);


    //Actions

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );

}