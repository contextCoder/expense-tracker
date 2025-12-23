import './Summary.css'

const Summary = ({ items }) => {
  const income = items
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)

  const expense = items
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)

  const balance = income - expense

  return (
    <section className="summary">
      <div className="summary-card income">
        <p className="summary-label">Income</p>
        <p className="summary-value" aria-live="polite">₹{income}</p>
      </div>

      <div className="summary-card expense">
        <p className="summary-label">Expense</p>
        <p className="summary-value" aria-live="polite">₹{expense}</p>
      </div>

      <div className={`summary-card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
        <p className="summary-label">Balance</p>
        <p className="summary-value" aria-live="polite">₹{balance}</p>
      </div>
    </section>
  )
}

export default Summary
