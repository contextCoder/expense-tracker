import api from '../api/axios';

export const expenseService = {
  async getAll() {
    const response = await api.get('/getExpenses');
    console.log(response);
    return response.data ? response.data : []
  }
}
