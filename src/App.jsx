import { useState, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import { expenseService } from './services/expenseService'
import api from "./api/axios";


const App = () => {
  const [expenses, setExpenses] = useState([])
  const [filterType, setFilterType] = useState('all');
  const [editingId, setEditingId] = useState(null)

  const filteredExpenses =
    filterType === 'all'
      ? expenses
      : expenses.filter((item) => item.type === filterType)

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const expenses = await expenseService.getAll();
      setExpenses(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const startEditHandler = (id) => {
    setEditingId(id)
  }

  const cancelEditHandler = () => {
    setEditingId(null)
  }

  const updateExpenseHandler = async (updatedExpense) => {
    try {
      const res = await api.put(`/updateExpense/${updatedExpense.id}`, updatedExpense);
      console.log("res------", res)

      setExpenses((prev) =>
        prev.map((item) =>
          item.id === updatedExpense.id ? updatedExpense : item
        )
      )
      setEditingId(null)
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  const addExpenseHandler = async (expense) => {
    try {
      const res = await api.post("/addExpense", expense);
      console.log("res------", res)
      setExpenses((prev) => [expense, ...prev])
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  const deleteExpenseHandler = async (id) => {
    try {
      const confirmed = window.confirm('Delete this transaction?')
      if (!confirmed) return

      const res = await api.delete(`/deleteExpense/${id}`);
      console.log("res------", res)

      setExpenses((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
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
