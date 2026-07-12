import { Suspense, lazy, useState } from "react"
import { motion } from "framer-motion"
import { slideInLeft, scaleIn, fadeUp } from "../motion/variants"

const Spline = lazy(() => import("@splinetool/react-spline"))
const SPLINE_SCENE = "https://prod.spline.design/jjv1gJhZR6ny-aYj/scene.splinecode"
const isMobile = typeof window !== "undefined" && window.innerWidth < 798

/* Liquid glass — identical recipe to HeroSection */
const liquidGlass = {
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.15), 0 12px 32px rgba(0,0,0,0.40)",
}

const heading = "'Clash Display', 'Arial Black', sans-serif"



export default function AboutSection() {
  const [splineLoaded, setSplineLoaded] = useState(false)

  return (
    <section
      id="about"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        padding: "120px 60px 80px",
      }}
    >
      {/* Layer 0: Giant background text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "clamp(80px, 20vw, 260px)",
            fontWeight: 600,
            letterSpacing: "0.46em",
            lineHeight: 1,
            color: "#fff",
          
            textAlign: "center",
            whiteSpace: "nowrap",
            fontFamily: heading,
          }}
        >
          ABOUT
        </span>
      </div>

      {/* Layer 1: Blue radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 65% at 70% 50%, rgba(20,60,180,0.40) 0%, rgba(10,30,140,0.16) 42%, transparent 72%)",
        }}
      />

      {/* ── CONTENT GRID ── */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: 1360,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "8fr 6fr",
        gap: 90,
        alignItems: "center",
      }}>

        {/* ── LEFT: TEXT + CARDS ── */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            
            <span style={{
              fontSize: 20, fontWeight: 650, letterSpacing: "0.21em",
              textTransform: "uppercase", color: "#4A8CFF",
            }}>
              I'M AKITHA CHANUPAMA
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(34px, 4.4vw, 50px)",
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: heading,
            }}
          >
            MOBILE APPLICATION <span style={{
              color: "#4A8CFF",
              textShadow: "0 0 24px rgba(74,140,255,0.8), 0 0 50px rgba(74,140,255,0.35)",
            }}>DEVELOPER</span>
          </h2>

          {/* Intro glass card */}
          <div style={{ borderRadius: 22, padding: "26px 28px", ...liquidGlass }}>
            <p style={{
              fontSize: 18,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.65)",
            }}>
Associate Software Engineer passionate about crafting innovative mobile applications. With a BSc (Hons) in Software Engineering (Second Upper Class) and industry experience at a leading Sri Lankan technology company, I focus on building reliable, user‑centric solutions. I thrive in collaborative environments where creativity meets problem‑solving and am driven to turn ideas into impactful products.
</p>
          </div>

          {/* Learn More button */}
          <div>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#fff",
                background: "#4A8CFF",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(74,140,255,0.4), 0 8px 24px rgba(0,0,0,0.30)",
                transition: "all 0.2s ease",
              }}
            >
              Learn More About Me
              <span style={{ fontSize: 18 }}>→</span>
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT: SPLINE 3D (transparent, side by side) ── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            position: "relative",
            minHeight: 560,
            height: "100%",
          }}
        >
          {/* Loading spinner */}
          {!splineLoaded && !isMobile && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: "2px solid rgba(74,140,255,0.3)",
                  borderTopColor: "#4A8CFF",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span style={{
                fontSize: 12, color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                Loading 3D scene…
              </span>
            </div>
          )}

          {!isMobile && (
            <Suspense fallback={null}>
              <Spline
                scene={SPLINE_SCENE}
                onLoad={() => setSplineLoaded(true)}
                style={{ width: "100%", height: "100%", background: "transparent" }}
              />
            </Suspense>
          )}
        </motion.div>

      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 40,
          right: 40,
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          Passionate about clean code & great design.
        </span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          ◆ &nbsp; Interactive 3D
        </span>
      </div>
    </section>
  )
}
