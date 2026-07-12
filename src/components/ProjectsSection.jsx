import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { slideInLeft, staggerContainer, cardItem } from '../motion/variants'
import { projects } from '../data/projects'

const heading = "'Clash Display', 'Arial Black', sans-serif"

const liquidGlass = {
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 12px 32px rgba(0,0,0,0.40)',
}

const glassPill = {
  ...liquidGlass,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  color: '#fff',
  cursor: 'pointer',
  border: '1px solid rgba(255,255,255,0.14)',
  transition: 'border-color .2s, box-shadow .2s, background .2s',
}

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 220, damping: 22 })
  const springY = useSpring(my, { stiffness: 220, damping: 22 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35) 0%, transparent 55%)`,
  )

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px)
    my.set(py)
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
      animate={{ scale: hovered ? 1.025 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        flexShrink: 0,
        width: 'min(380px, 82vw)',
        scrollSnapAlign: 'center',
        borderRadius: 24,
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
          ? `inset 0 1.5px 0 rgba(255,255,255,0.18), 0 24px 48px rgba(0,0,0,0.45), 0 0 40px ${project.accentSoft}`
          : liquidGlass.boxShadow,
      }}
    >
      {/* Accent rim glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 24,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0.55,
          transition: 'opacity .3s',
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${project.accentSoft} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* Preview plane */}
      <div
        style={{
          position: 'relative',
          height: 220,
          overflow: 'hidden',
          background: project.gradient,
          transform: 'translateZ(28px)',
        }}
      >
        {/* Soft mesh orbs */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 160,
            height: 160,
            borderRadius: '50%',
            top: -40,
            right: -20,
            background: `radial-gradient(circle, ${project.accent}88 0%, transparent 70%)`,
            filter: 'blur(2px)',
            animation: 'projectOrbFloat 6s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            bottom: -30,
            left: 24,
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
            animation: 'projectOrbFloat 7.5s ease-in-out infinite reverse',
          }}
        />

        {/* Glass device frame */}
        <div
          style={{
            position: 'absolute',
            inset: '28px 48px 18px',
            borderRadius: 18,
            background: 'linear-gradient(165deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 16px 40px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 16px',
            gap: 10,
            transform: 'translateZ(40px)',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span
                key={c}
                style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.85 }}
              />
            ))}
          </div>
          <div
            style={{
              height: 8,
              width: '42%',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.35)',
            }}
          />
          <div
            style={{
              height: 6,
              width: '68%',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.18)',
            }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 4, flex: 1 }}>
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                background: `linear-gradient(160deg, ${project.accentSoft}, rgba(255,255,255,0.06))`,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </div>
        </div>

        {/* Mouse glare */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: hovered ? 0.55 : 0,
            background: glareBackground,
            transition: 'opacity .25s',
          }}
        />

        {/* Year badge */}
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 2,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            padding: '6px 12px',
            borderRadius: 999,
            color: '#fff',
            ...liquidGlass,
          }}
        >
          {project.year}
        </span>

        {project.featured && (
          <span
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 2,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              borderRadius: 999,
              color: '#fff',
              background: project.accent,
              boxShadow: `0 0 20px ${project.accentSoft}`,
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ position: 'relative', zIndex: 1, padding: '22px 22px 20px' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 650,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: project.accent,
            marginBottom: 8,
          }}
        >
          {project.subtitle}
        </p>

        <h3
          style={{
            fontFamily: heading,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '0.02em',
            marginBottom: 10,
            color: '#fff',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 18,
            minHeight: 72,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.06em',
                borderRadius: 999,
                padding: '5px 12px',
                color: i === 0 ? project.accent : 'rgba(255,255,255,0.65)',
                border:
                  i === 0
                    ? `1px solid ${project.accentSoft}`
                    : '1px solid rgba(255,255,255,0.14)',
                background:
                  i === 0
                    ? `linear-gradient(160deg, ${project.accentSoft}, rgba(255,255,255,0.03))`
                    : 'rgba(255,255,255,0.03)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <a
            href={project.liveUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#fff',
              textDecoration: 'none',
              background: project.accent,
              boxShadow: `0 0 20px ${project.accentSoft}, 0 8px 20px rgba(0,0,0,0.28)`,
              transition: 'transform .2s, filter .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.filter = 'brightness(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.filter = 'none'
            }}
          >
            View Project
            <span aria-hidden>→</span>
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              ...liquidGlass,
              transition: 'border-color .2s, color .2s, box-shadow .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = project.accentSoft
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.boxShadow = `inset 0 1.5px 0 rgba(255,255,255,0.15), 0 0 18px ${project.accentSoft}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              e.currentTarget.style.boxShadow = liquidGlass.boxShadow
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const scrollerRef = useRef(null)

  const scrollByCard = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(400, el.clientWidth * 0.75) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0A0A0A',
        overflow: 'hidden',
        padding: '110px 0 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Giant watermark */}
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
            lineHeight: 1,
            color: '#fff',
            whiteSpace: 'nowrap',
            fontFamily: heading,
            opacity: 0.07,
          }}
        >
          PROJECTS
        </span>
      </div>

      {/* Blue radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 60% at 25% 45%, rgba(20,60,180,0.42) 0%, rgba(10,30,140,0.16) 42%, transparent 72%)',
        }}
      />

      {/* Secondary teal wash */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 40% 45% at 85% 70%, rgba(61,214,195,0.12) 0%, transparent 65%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Header */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            padding: '0 clamp(24px, 5vw, 60px)',
            marginBottom: 40,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#4A8CFF',
                  boxShadow: '0 0 14px rgba(74,140,255,0.9)',
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 650,
                  letterSpacing: '0.21em',
                  textTransform: 'uppercase',
                  color: '#4A8CFF',
                }}
              >
                Selected Work
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(34px, 4.4vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontFamily: heading,
                marginBottom: 14,
              }}
            >
              Featured{' '}
              <span
                style={{
                  color: '#4A8CFF',
                  textShadow:
                    '0 0 24px rgba(74,140,255,0.8), 0 0 50px rgba(74,140,255,0.35)',
                }}
              >
                Projects
              </span>
            </h2>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 480,
              }}
            >
              Interactive builds across mobile and web — crafted with clean architecture,
              polished motion, and liquid-glass interfaces.
            </p>
          </div>

          {/* Scroll controls */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              aria-label="Scroll projects left"
              onClick={() => scrollByCard(-1)}
              style={glassPill}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74,140,255,0.45)'
                e.currentTarget.style.boxShadow =
                  'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 0 22px rgba(74,140,255,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                e.currentTarget.style.boxShadow = liquidGlass.boxShadow
              }}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Scroll projects right"
              onClick={() => scrollByCard(1)}
              style={glassPill}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74,140,255,0.45)'
                e.currentTarget.style.boxShadow =
                  'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 0 22px rgba(74,140,255,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                e.currentTarget.style.boxShadow = liquidGlass.boxShadow
              }}
            >
              →
            </button>
          </div>
        </motion.div>

        {/* Cards scroller */}
        <motion.div
          ref={scrollerRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="scrollbar-none projects-scroller"
          style={{
            display: 'flex',
            gap: 28,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '12px clamp(24px, 5vw, 60px) 28px',
            perspective: 1200,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 40,
          right: 40,
          zIndex: 2,
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
          ◇ &nbsp; Drag or scroll to explore
        </span>
      </div>
    </section>
  )
}
