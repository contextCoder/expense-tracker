import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="app-title">Expense Tracker</h1>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/analytics">Analytics</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
