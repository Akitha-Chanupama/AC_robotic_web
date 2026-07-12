import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import { slideInLeft } from '../motion/variants'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SPLINE_SCENE = 'https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode'
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export default function HeroSection() {
  const [splineLoaded, setSplineLoaded] = useState(false)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      {/* Layer 0: Giant name text — behind everything */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '28vh',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(60px, 13vw, 220px)',
            fontWeight: 700,
            letterSpacing: '0.20em',
            lineHeight: 1,
            color: '#fff',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          A K I T H A
        </span>
      </div>

      {/* Layer 1: Orange radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(20,60,180,0.45) 0%, rgba(10,30,140,0.20) 40%, transparent 70%)',
        }}
      />

      {/* Layer 2: Loading spinner */}
      {!splineLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              border: '2px solid rgba(74,140,255,0.3)',
              borderTopColor: '#4A8CFF',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Loading 3D scene…
          </span>
        </div>
      )}

      {/* Layer 3: Spline 3D scene */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'auto' }}>
        {isMobile ? (
          <SplineFallback />
        ) : (
          <Suspense fallback={null}>
            <Spline
              scene={SPLINE_SCENE}
              onLoad={() => setSplineLoaded(true)}
              style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
            />
          </Suspense>
        )}
      </div>

      {/* Scene status label */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          fontSize: 11,
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
        }}
      >
        0X7A
      </div>

      {/* Layer 4: Floating UI */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>

        {/* Tagline — bottom left */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 70,
            left: 40,
            pointerEvents: 'auto',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 4.8vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              fontFamily: "'Clash Display', 'Arial Black', sans-serif",
            }}
          >
            Mobile <span style={{
              color: '#4A8CFF',
              fontWeight: 800,
              textShadow: '0 0 24px rgba(74,140,255,0.8), 0 0 50px rgba(74,140,255,0.35)',
            }}>App</span><br />
            Developer
          </h2>

          {/* Status cards — liquid glass */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            {[
              { label: 'Experience', value: '4+', unit: 'Years' },
              { label: 'Projects', value: '40+', unit: 'Built' },
              { label: 'Code Lines', value: '∞', unit: 'Written' },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  borderRadius: 18,
                  padding: '18px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  minWidth: 130,
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 12px 32px rgba(0,0,0,0.40)',
                }}
              >
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: 6,
                  }}
                >
                  {card.value}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.50)',
                  }}
                >
                  {card.unit}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#4A8CFF',
                    marginTop: 3,
                  }}
                >
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact card — bottom right */}
        <ContactCard />

      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 40,
          right: 40,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
          Built with purpose. Crafted with precision.
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
          ↓ &nbsp; Scroll to explore
        </span>
      </div>
    </section>
  )
}

function ContactCard() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 50,
        right: 40,
        width: 500,
        pointerEvents: 'auto',
        borderRadius: 24,
        overflow: 'hidden',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 32px 80px rgba(0,0,0,0.50)',
      }}
    >
    <div style={{ padding: '32px 32px 28px' }}>
      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.02em' }}>
        Contact by Email
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.50)', marginBottom: 24, lineHeight: 1.5 }}>
        Enter your email and I will get back to you.
      </p>

      {/* Social icons */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
        {[
          { label: 'in', orange: true, title: 'LinkedIn' },
          { label: 'gh', orange: false, title: 'GitHub' },
          { label: 'fb', orange: false, title: 'Facebook' },
          { label: 'tw', orange: false, title: 'Twitter' },
        ].map((icon) => (
          <button
            key={icon.label}
            title={icon.title}
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              border: icon.orange ? 'none' : '1px solid rgba(255,255,255,0.14)',
              background: icon.orange ? '#4A8CFF' : 'rgba(255,255,255,0.09)',
              color: icon.orange ? '#fff' : 'rgba(255,255,255,0.65)',
              transition: 'all .15s',
            }}
          >
            {icon.label}
          </button>
        ))}
      </div>

      {/* Email input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 16,
          padding: '6px 6px 6px 18px',
        }}
      >
        <input
          type="email"
          placeholder="Your Email"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            fontSize: 15,
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          style={{
            width: 46,
            height: 46,
            background: '#4A8CFF',
            border: 'none',
            borderRadius: 12,
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          →
        </button>
      </div>
    </div>
    </div>
  )
}

function SplineFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.15)',
        fontSize: 14,
      }}
    >
      3D scene — desktop only
    </div>
  )
}
