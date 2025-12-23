import './Filter.css'

const Filter = ({ selected, onChange }) => {
  return (
    <div className="filter">
      <button
        type="button"
        className={selected === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All
      </button>

      <button
        type="button"
        className={selected === 'income' ? 'active' : ''}
        onClick={() => onChange('income')}
      >
        Income
      </button>

      <button
        type="button"
        className={selected === 'expense' ? 'active' : ''}
        onClick={() => onChange('expense')}
      >
        Expense
      </button>
    </div>
  )
}

export default Filter
