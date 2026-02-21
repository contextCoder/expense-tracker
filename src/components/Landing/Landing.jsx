import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = ({ expenses }) => {
  const navigate = useNavigate()

  return (
    <div className="landing-root">
      <div className="landing-bg" />

      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Understand your money at a glance</h2>
            <p className="lead">Smart summaries, category insights and easy entries. Start tracking today.</p>

            <div className="cta-row">
              <button className="rotating-btn" onClick={() => navigate('/analytics')}>Analyse Expenses</button>
              <button className="rotating-btn" onClick={() => navigate('/dashboard')}>Check Expenses</button>
              <button className="rotating-btn" onClick={() => navigate('/dashboard')}>Add new Expense</button>
            </div>
          </div>

          <div className="hero-art">
            <div className="card">
              <div className="card-row">
                <div className="circle income" />
                <div className="meta">
                  <div className="amount">₹{expenses && expenses.length ? expenses.reduce((s, i) => s + (i.amount || 0), 0) : 0}</div>
                  <div className="label">Total</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">Made with ♥ for your finances</footer>
    </div>
  )
}

export default Landing
