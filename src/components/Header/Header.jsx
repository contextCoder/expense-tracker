import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  const profileOptions = [
    { label: 'Profile', path: '/profile' },
    { label: 'Personal Details', path: '/personal-details' },
    { label: 'View Notes', path: '/notes' },
    { label: 'Logout', path: '/logout' },
  ]

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand-title">
          <h1 className="app-title">Expense<span>Tracker</span></h1>
          <p className="tag">Keep tabs on spending — beautifully.</p>

        </Link>

        <nav className="nav-center">
          {!isLanding && <Link to="/" className="nav-link">Dashboard</Link>}
          <Link to="/analytics" className="nav-link">Analytics</Link>
        </nav>

        <div className="profile-menu">
          <button
            className="profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-label="User menu"
          >
            <div className="profile-avatar">👤</div>
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              {profileOptions.map((option) => (
                <Link
                  key={option.label}
                  to={option.path}
                  className="profile-option"
                  onClick={() => setProfileOpen(false)}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
