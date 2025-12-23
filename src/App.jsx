import { useState, useEffect, useRef } from 'react'
import Layout from './components/Layout/Layout'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import { expenseService } from './services/expenseService'

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const stored = expenseService.getAll()
    return stored
  })
  const [filterType, setFilterType] = useState('all');
  const [editingId, setEditingId] = useState(null)
  const hasLoaded = useRef(false)

  const filteredExpenses =
    filterType === 'all'
      ? expenses
      : expenses.filter((item) => item.type === filterType)

  useEffect(() => {
    expenseService.saveAll(expenses)
  }, [expenses])

  const startEditHandler = (id) => {
    setEditingId(id)
  }

  const cancelEditHandler = () => {
    setEditingId(null)
  }

  const updateExpenseHandler = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      )
    )
    setEditingId(null)
  }

  const addExpenseHandler = (expense) => {
    setExpenses((prev) => [expense, ...prev])
  }

  const deleteExpenseHandler = (id) => {
    const confirmed = window.confirm('Delete this transaction?')
    if (!confirmed) return

    setExpenses((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Layout>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                expenses={expenses}
                filteredExpenses={filteredExpenses}
                filterType={filterType}
                onFilterChange={setFilterType}
                onAddExpense={addExpenseHandler}
                onDeleteExpense={deleteExpenseHandler}
                onEditStart={startEditHandler}
                onEditCancel={cancelEditHandler}
                onUpdateExpense={updateExpenseHandler}
                editingId={editingId}
              />
            }
          />
          <Route path="/analytics" element={<Analytics expenses={expenses} />} />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
