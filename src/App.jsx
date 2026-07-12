import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import './App.css'

export default function App() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
