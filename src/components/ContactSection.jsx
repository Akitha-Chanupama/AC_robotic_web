import { motion } from 'framer-motion'
import { fadeUp } from '../motion/variants'

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        minHeight: '80vh',
        background: '#0A0A0A',
        padding: '100px 40px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Giant background text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(80px, 18vw, 220px)',
          fontWeight: 900,
          color: '#fff',
          opacity: 0.06,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        CONTACT
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 560 }}>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 20,
          }}
        >
          GET IN TOUCH
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          Let's build something<br />
          <span style={{ color: '#4A8CFF' }}>great together.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 40,
          }}
        >
          Open to freelance projects, full-time roles, and collaborations.
          Drop your email and I'll get back to you.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'flex', gap: 10, justifyContent: 'center' }}
        >
          <input
            type="email"
            placeholder="Your Email"
            style={{
              flex: 1,
              maxWidth: 320,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14,
              padding: '14px 18px',
              fontSize: 14,
              color: '#fff',
              outline: 'none',
            }}
          />
          <button
            style={{
              background: '#4A8CFF',
              border: 'none',
              borderRadius: 14,
              padding: '14px 24px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Send →
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>
          © 2026 Akitha
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>
          Built with React + Spline + Framer Motion
        </span>
      </div>
    </section>
  )
}
