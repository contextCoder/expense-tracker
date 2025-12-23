import { useState } from 'react'
import './AddExpense.css'

const AddExpense = ({ onAddExpense }) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Food')


  const isFormValid = title.trim() !== '' && amount > 0

  const submitHandler = (e) => {
    e.preventDefault()
    if (!isFormValid) return

    const expenseData = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toLocaleDateString(),
    }

    onAddExpense(expenseData)

    setTitle('')
    setAmount('')
    setType('expense')
    setCategory('Food')
  }

  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <h2 className="section-title">Add Transaction</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Grocery"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 1200"
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>


      <button
        className="btn-primary"
        disabled={!isFormValid}
        aria-disabled={!isFormValid}
      >
        Save
      </button>

    </form>
  )
}

export default AddExpense
