import ExpenseItem from './ExpenseItem'
import './Expense.css'

const ExpenseList = ({
  items,
  onDeleteExpense,
  onEditStart,
  onEditCancel,
  onUpdateExpense,
  editingId,
}) => {
  if (items.length === 0) {
    return <p>No transactions yet.</p>
  }

  const sortedItems = [...items].sort((a, b) => new Date(b.date) - new Date(a.date))

  const groupedExpenses = sortedItems.reduce((groups, item) => {
    const date = new Date(item.date)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    if (!groups[key]) {
      groups[key] = {
        month: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
        items: [],
        income: 0,
        expense: 0,
      }
    }

    groups[key].items.push(item)

    if (item.type === 'income') {
      groups[key].income += item.amount
    } else {
      groups[key].expense += item.amount
    }

    return groups
  }, {})

  const groupedArray = Object.values(groupedExpenses)

  return (
    <section className="expense-section">
      <h2 className="section-title">Recent Transactions</h2>

      <div className="expense-list">
        {groupedArray.map((group) => (
          <div key={group.month} className="month-group">
            <div className="month-header">
              <h3>{group.month}</h3>
              <div className="month-summary">
                <span className="income">+₹{group.income}</span>
                <span className="expense">-₹{group.expense}</span>
              </div>
            </div>

            <div className="expense-list">
              {group.items.map((item) => (
                <ExpenseItem
                  key={item.id}
                  {...item}
                  isEditing={editingId === item.id}
                  onDelete={onDeleteExpense}
                  onEditStart={onEditStart}
                  onEditCancel={onEditCancel}
                  onUpdate={onUpdateExpense}
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default ExpenseList
