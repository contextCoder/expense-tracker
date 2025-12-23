import Summary from '../components/Expense/Summary'
import Filter from '../components/Expense/Filter'
import AddExpense from '../components/Expense/AddExpense'
import ExpenseList from '../components/Expense/ExpenseList'

const Dashboard = ({
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
  return (
    <>
      <Summary items={expenses} />

      <Filter
        selected={filterType}
        onChange={onFilterChange}
      />

      <AddExpense onAddExpense={onAddExpense} />

      <ExpenseList
        items={filteredExpenses}
        onDeleteExpense={onDeleteExpense}
        onEditStart={onEditStart}
        onEditCancel={onEditCancel}
        onUpdateExpense={onUpdateExpense}
        editingId={editingId}
      />
    </>
  )
}

export default Dashboard
