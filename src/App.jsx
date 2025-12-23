import { useState, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import { expenseService } from './services/expenseService'


const STORAGE_KEY = 'expenses'

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [editingId, setEditingId] = useState(null)

  const filteredExpenses =
    filterType === 'all'
      ? expenses
      : expenses.filter((item) => item.type === filterType)

  useEffect(() => {
    setExpenses(expenseService.getAll())
  }, [])

  useEffect(() => {
    expenseService.saveAll(expenses)
  }, [expenses])


  // /* Load from localStorage on first render */
  // useEffect(() => {
  //   const storedExpenses = localStorage.getItem(STORAGE_KEY)
  //   if (storedExpenses) {
  //     setExpenses(JSON.parse(storedExpenses))
  //   }
  // }, [])

  // /* Save to localStorage whenever expenses change */
  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  // }, [expenses])

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
          <Route path="/analytics" element={<Analytics  expenses={expenses}/>} />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
