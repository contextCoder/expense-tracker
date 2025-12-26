const STORAGE_KEY = 'expenses'
import api from '../api/axios';

export const expenseService = {
  async getAll() {
    const response = await api.get('/getExpenses');
    console.log(response);
    return response.data ? response.data : []
  },

  saveAll(expenses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  },
}
