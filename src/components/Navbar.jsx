import { useLiveTime } from '../hooks/useLiveTime'

const pillStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 9,
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 999,
  padding: '11px 24px',
  fontSize: 14,
  color: '#fff',
  background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
  cursor: 'pointer',
  transition: 'all .18s',
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,0,0.30)',
}

export default function Navbar() {
  const time = useLiveTime('Asia/Colombo')

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 40px',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={pillStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(160deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.06) 100%)'}
          onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)'}
        >
          <span style={{ fontSize: 15, lineHeight: 1 }}>☰</span>
          <span>Menu</span>
        </button>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          / &nbsp; Sri Lanka – {time}
        </span>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={pillStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(160deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.06) 100%)'}
          onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)'}
        >
          Flutter Dev <span style={{ fontSize: 12 }}>›</span>
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 999,
            padding: '12px 26px',
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            background: '#4A8CFF',
            border: 'none',
            cursor: 'pointer',
            transition: 'filter .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.12)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >
          View Projects
        </button>
      </div>
    </nav>
  )
}
