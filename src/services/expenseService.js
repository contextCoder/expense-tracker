const STORAGE_KEY = 'expenses'
const API_URL = 'http://localhost:5000/api/expenses'

// Example future usage
// return fetch(API_URL).then(res => res.json())

/* Temporary: localStorage-based implementation */

export const expenseService = {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  saveAll(expenses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  },
}
