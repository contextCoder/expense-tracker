import { useState, useEffect } from 'react'
import './Analytics.css'

/* ---------- SVG ARC HELPERS ---------- */

const polarToCartesian = (cx, cy, r, angle) => {
  const rad = (angle - 90) * Math.PI / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ')
}

const getColor = (index) => `hsl(${index * 60}, 70%, 50%)`

/* ---------- COMPONENT ---------- */

const Analytics = ({ expenses }) => {
  const [selectedMonth, setSelectedMonth] = useState('')
  const [hovered, setHovered] = useState(null)
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })

  /* ---------- MONTHLY TOTALS ---------- */

  const monthlyTotals = expenses.reduce((acc, item) => {
    if (item.type !== 'expense') return acc

    const date = new Date(item.date)
    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`

    if (!acc[key]) {
      acc[key] = {
        label: date.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        }),
        total: 0,
      }
    }

    acc[key].total += item.amount
    return acc
  }, {})

  const monthlyData = Object.entries(monthlyTotals)
    .map(([key, value]) => ({
      key,
      label: value.label,
      total: value.total,
    }))
    .sort((a, b) => a.key.localeCompare(b.key))

  useEffect(() => {
    if (monthlyData.length && !selectedMonth) {
      setSelectedMonth(monthlyData[monthlyData.length - 1].key)
    }
  }, [monthlyData, selectedMonth])

  /* ---------- CATEGORY AGGREGATION ---------- */

  const categoryTotals = expenses.reduce((acc, item) => {
    if (item.type !== 'expense') return acc

    const category = item.category || 'Other'
    acc[category] = (acc[category] || 0) + item.amount
    return acc
  }, {})

  const categoryData = Object.entries(categoryTotals).map(
    ([category, total]) => ({ category, total })
  )

  const totalExpense = categoryData.reduce(
    (sum, item) => sum + item.total,
    0
  )

  const categoryWithPercent = categoryData.map((item) => ({
    ...item,
    percent: totalExpense
      ? ((item.total / totalExpense) * 100).toFixed(1)
      : 0,
  }))

  /* ---------- DONUT CONFIG ---------- */

  const radius = 80
  const strokeWidth = 30
  const center = 100
  const viewBoxSize = 200

  /* ---------- RENDER ---------- */

  return (
    <section>
      <h2>Category-wise Expense Analytics</h2>

      <svg
        width="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        role="img"
        aria-label="Category wise expense donut chart"
      >
        {(() => {
          let startAngle = 0

          return categoryData.map((item, index) => {
            const angle = (item.total / totalExpense) * 360
            const endAngle = startAngle + angle

            const path = describeArc(
              center,
              center,
              radius,
              startAngle,
              endAngle
            )

            const percent = totalExpense ? ((item.total / totalExpense) * 100).toFixed(1) : 0

            startAngle = endAngle

            return (
              <path
                key={item.category}
                d={path}
                fill="none"
                stroke={getColor(index)}
                strokeWidth={hovered && hovered.category === item.category ? strokeWidth + 8 : strokeWidth}
                className={`donut-slice ${hovered && hovered.category === item.category ? 'active' : ''}`}
                tabIndex="0"
                aria-label={`${item.category}: ₹${item.total}`}
                onMouseEnter={(e) => {
                  setHovered({ category: item.category, total: item.total, percent, color: getColor(index) })
                  setHoverPos({ x: e.clientX, y: e.clientY })
                }}
                onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })
        })()}

        {/* Donut hole */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="var(--color-white)"
        />

        {/* Center label */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="600"
        >
          ₹{totalExpense}
        </text>
      </svg>

      {hovered && (
        <div
          className="analytics-tooltip"
          style={{ left: hoverPos.x + 12, top: hoverPos.y + 12 }}
        >
          <div
            className="tooltip-swatch"
            style={{ backgroundColor: hovered.color }}
            aria-hidden="true"
          />
          <div className="tooltip-body">
            <div className="tooltip-title">{hovered.category}</div>
            <div className="tooltip-meta">{hovered.percent}% • ₹{hovered.total}</div>
          </div>
        </div>
      )}

      {/* Legend */}
      <ul className="donut-legend">
        {categoryWithPercent.map((item, index) => (
          <li key={item.category}>
            <span
              className="legend-color"
              style={{ backgroundColor: getColor(index) }}
              aria-hidden="true"
            />
            <span className="legend-label">{item.category}</span>
            <span className="legend-value">
              ₹{item.total} ({item.percent}%)
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Analytics
