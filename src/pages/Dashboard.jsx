import { useEffect, useState } from 'react'
import { expenseService } from '../services/expenseService'
import api from '../api/axios'
import DashboardView from './DashboardView'

const Dashboard = () => {
  const [expenses, setExpenses] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [editingId, setEditingId] = useState(null)

  const filteredExpenses =
    filterType === 'all'
      ? expenses
      : expenses.filter(item => item.type === filterType)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const data = await expenseService.getAll()
      setExpenses(data)
    } catch (err) {
      console.error('Error fetching expenses', err)
    }
  }

  const addExpenseHandler = async (expense) => {
    try {
      await api.post('/addExpense', expense)
      setExpenses(prev => [expense, ...prev])
    } catch (err) {
      console.error(err)
    }
  }

  const updateExpenseHandler = async (updatedExpense) => {
    try {
      await api.put(`/updateExpense/${updatedExpense.id}`, updatedExpense)
      setExpenses(prev =>
        prev.map(item =>
          item.id === updatedExpense.id ? updatedExpense : item
        )
      )
      setEditingId(null)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteExpenseHandler = async (id) => {
    if (!window.confirm('Delete this transaction?')) return
    try {
      await api.delete(`/deleteExpense/${id}`)
      setExpenses(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardView
      expenses={expenses}
      filteredExpenses={filteredExpenses}
      filterType={filterType}
      onFilterChange={setFilterType}
      onAddExpense={addExpenseHandler}
      onDeleteExpense={deleteExpenseHandler}
      onEditStart={setEditingId}
      onEditCancel={() => setEditingId(null)}
      onUpdateExpense={updateExpenseHandler}
      editingId={editingId}
    />
  )
}

export default Dashboard
