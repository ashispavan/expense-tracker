import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

function AddTransaction() {

	const { addTransaction } = useContext(GlobalContext);

	const [text, setText] = useState('Longos');
	const [amount, setAmount] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		const newTransaction = {
			id: Math.floor(Math.random() * 100000000),
			text,
			amount: +amount
		}
		
		addTransaction(newTransaction);
		setText('Longos');
		setAmount('');

	}

	return (
		<>
		<h3>Add new transaction</h3>
		<form onSubmit={onSubmit}>
			<div className="form-control">
				{/* <label htmlFor="text">Text</label> */}
				{/* <input type="text" onChange={(e) => setText(e.target.value)}  value={text} id="text" placeholder="Enter text..." /> */}
				<select value={text} onChange={(e) => setText(e.target.value)}>
					<option value="Longos">Longos</option>
					<option value="Hydro">Hydro</option>
					<option value="Dollarama">Dollarama</option>
					<option value="Rogers">Rogers</option>
					<option value="FineIndiaGroceries">Fine India Groceries</option>
					<option value="Eggsmart">Eggsmart</option>
					<option value="UberEats">Uber Eats</option>
					<option value="IndianCrown">Indian Crown</option>
					<option value="Insurance">Insurance</option>
					<option value="Rent">Rent</option>
					<option value="Miscellaneous">Miscellaneous</option>
					Select
          		</select>
			</div>
			<div className="form-control">
				<label htmlFor="amount"
					>Amount <br />
					(negative - expense, positive - income)</label
				>
				<input type="number" id="amount" onChange={(e) => setAmount(e.target.value)}  value={amount} placeholder="Enter amount..." />
			</div>
			<button className="btn">Add transaction</button>
		</form>
		</>
	)
}

export default AddTransaction
