import { useMemo, useState } from 'react'
import Summary from '../components/Expense/Summary'
import Filter from '../components/Expense/Filter'
import AddExpense from '../components/Expense/AddExpense'
import ExpenseList from '../components/Expense/ExpenseList'
import './Dashboard.css'

const DashboardView = ({
  expenses,
  filteredExpenses,
  filterType,
  onAddExpense,
  onDeleteExpense,
  onEditStart,
  onEditCancel,
  onUpdateExpense,
  onFilterChange,
  editingId,
}) => {
  const [openMonth, setOpenMonth] = useState(null)

  const months = useMemo(() => {
    const map = {}
    expenses.forEach((item) => {
      const date = new Date(item.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      if (!map[key]) {
        map[key] = { key, label: date.toLocaleString('default', { month: 'short', year: 'numeric' }), items: [], total: 0 }
      }
      map[key].items.push(item)
      map[key].total += item.amount || 0
    })
    return Object.values(map).sort((a, b) => b.key.localeCompare(a.key))
  }, [expenses])
  return (
    <div className="dashboard-root">
      <Filter selected={filterType} onChange={onFilterChange} />

      <div className="top-row">
        <div className="left-col">
          <Summary items={expenses} />
        </div>
        <div className="right-col">
          <AddExpense onAddExpense={onAddExpense} />
        </div>
      </div>

      <div className="months-wrap">
        {months.map((m) => (
          <div className={`month-accordion ${openMonth === m.key ? 'open' : ''}`} key={m.key}>
            <button className="month-header" onClick={() => setOpenMonth(openMonth === m.key ? null : m.key)}>
              <div>
                <div className="month-label">{m.label}</div>
                <div className="month-summary">
                  <span className="month-total">₹{m.total}</span>
                  <span className="month-count">{m.items.length} items</span>
                </div>
              </div>
              <div className="chev">{openMonth === m.key ? '▾' : '▸'}</div>
            </button>

            <div className="month-body" aria-hidden={openMonth !== m.key}>
              <ExpenseList
                items={m.items}
                onDeleteExpense={onDeleteExpense}
                onEditStart={onEditStart}
                onEditCancel={onEditCancel}
                onUpdateExpense={onUpdateExpense}
                editingId={editingId}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardView
