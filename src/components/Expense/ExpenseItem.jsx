import { useState } from 'react'
import './Expense.css'

const ExpenseItem = ({
  id,
  title,
  amount,
  type,
  date,
  onDelete,
  onEditStart,
  onEditCancel,
  onUpdate,
  isEditing,
}) => {
  const [editTitle, setEditTitle] = useState(title)
  const [editAmount, setEditAmount] = useState(amount)
  const [editType, setEditType] = useState(type)

  const newdata = new Date(date);

  const saveHandler = () => {
    onUpdate({
      id,
      title: editTitle,
      amount: Number(editAmount),
      type: editType,
      date,
    })
  }

  if (isEditing) {
    return (
      <div className="expense-item edit">
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <input
          type="number"
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
        />

        <select
          value={editType}
          onChange={(e) => setEditType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="edit-actions">
          <button onClick={saveHandler}>Save</button>
          <button onClick={onEditCancel}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`expense-item ${type}`}>
      <div className="expense-left">
        <p className="expense-title">{title}</p>
        <span className="expense-date">{newdata.toLocaleDateString()}</span>
      </div>

      <div className="expense-right">
        <span className="expense-amount">
          {type === 'expense' ? '-' : '+'}₹{amount}
        </span>

        <button
          aria-label="Edit transaction"
          onClick={() => onEditStart(id)}
        >
          Edit
        </button>

        <button
          aria-label="Delete transaction"
          onClick={() => onDelete(id)}
        >
          ✕
        </button>

      </div>
    </div>
  )
}

export default ExpenseItem
