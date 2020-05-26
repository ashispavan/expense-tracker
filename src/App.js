import React from 'react';
import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import SummaryChart from './components/SummaryChart';


function App() {
  return (
    <GlobalProvider>
     <Header />
     <div className="app-container">
     <section className='expense-section'>
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
     </section>
     <section className='summary-section'>
      <SummaryChart />
     </section>
     </div>


    </GlobalProvider>
  );
}

export default App;
