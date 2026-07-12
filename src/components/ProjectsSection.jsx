import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { fadeUp, staggerContainer, cardItem } from '../motion/variants'
import { projects } from '../data/projects'

const heading = "'Clash Display', 'Arial Black', sans-serif"

const liquidGlass = {
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 12px 32px rgba(0,0,0,0.40)',
}

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 220, damping: 24 })
  const springY = useSpring(my, { stiffness: 220, damping: 24 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <motion.article
      ref={cardRef}
      variants={cardItem}
      className="project-card"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      animate={{ scale: hovered ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      style={{
        width: '100%',
        maxWidth: 340,
        borderRadius: 22,
        overflow: 'hidden',
        position: 'relative',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        ...liquidGlass,
        border: hovered
          ? `1px solid ${project.accentSoft}`
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow: hovered
          ? `inset 0 1.5px 0 rgba(255,255,255,0.18), 0 20px 40px rgba(0,0,0,0.4), 0 0 28px ${project.accentSoft}`
          : liquidGlass.boxShadow,
      }}
    >
      {/* Preview */}
      <div
        style={{
          position: 'relative',
          height: 168,
          overflow: 'hidden',
          background: project.gradient,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: '50%',
            top: -36,
            right: -16,
            background: `radial-gradient(circle, ${project.accent}77 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '36px 44px 28px',
            borderRadius: 14,
            background: 'linear-gradient(165deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 18px' }}>
        <h3
          style={{
            fontFamily: heading,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.02em',
            marginBottom: 8,
            color: '#fff',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 16,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  borderRadius: 999,
                  padding: '4px 10px',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            style={{
              width: 34,
              height: 34,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.04)',
              transition: 'border-color .2s, color .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = project.accentSoft
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const featured = projects.slice(0, 3)

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0A0A0A',
        overflow: 'hidden',
        padding: '100px 24px 90px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(72px, 16vw, 220px)',
            fontWeight: 600,
            letterSpacing: '0.3em',
            color: '#fff',
            whiteSpace: 'nowrap',
            fontFamily: heading,
            opacity: 0.06,
          }}
        >
          PROJECTS
        </span>
      </div>

      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 55% at 50% 45%, rgba(20,60,180,0.38) 0%, rgba(10,30,140,0.14) 42%, transparent 72%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 650,
              letterSpacing: '0.21em',
              textTransform: 'uppercase',
              color: '#4A8CFF',
              marginBottom: 14,
            }}
          >
            Selected Work
          </span>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.2vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: heading,
            }}
          >
            Featured{' '}
            <span
              style={{
                color: '#4A8CFF',
                textShadow: '0 0 24px rgba(74,140,255,0.8), 0 0 50px rgba(74,140,255,0.35)',
              }}
            >
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 24,
            width: '100%',
            marginBottom: 44,
            perspective: 1200,
          }}
        >
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View All */}
        <motion.a
          href="#"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '15px 28px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#fff',
            textDecoration: 'none',
            ...liquidGlass,
            border: '1px solid rgba(74,140,255,0.35)',
            boxShadow:
              'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 0 28px rgba(74,140,255,0.22), 0 12px 32px rgba(0,0,0,0.35)',
          }}
        >
          View All Projects
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#4A8CFF',
              boxShadow: '0 0 16px rgba(74,140,255,0.55)',
              fontSize: 14,
            }}
          >
            →
          </span>
        </motion.a>
      </div>
    </section>
  )
}
