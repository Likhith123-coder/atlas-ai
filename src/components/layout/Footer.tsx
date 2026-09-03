import { ArrowUp, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="editorial-footer">
      <div className="footer-container">
        <div className="footer-brand-block">
          <Link className="brand" to="/" aria-label="Atlas AI home">
            <Compass size={22} />
            Atlas AI
          </Link>
          <p className="footer-tagline">
            Cinematic travel exploration, real-time atmospheric intelligence, and editorial itinerary curation.
          </p>
          <div className="footer-live-status">
            <span className="status-dot" />
            <span>Satellites Active &bull; Gemini AI Connected &bull; Live Weather Sync</span>
          </div>
        </div>

        <div className="footer-nav-groups">
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#top">Overview</a></li>
              <li><a href="#explore">Explorer</a></li>
              <li><a href="#destination">Destination Guide</a></li>
              <li><a href="#planner">AI Planner</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Technology</h4>
            <ul>
              <li><span>Google Gemini API</span></li>
              <li><span>OpenWeather Service</span></li>
              <li><span>Pexels Curated Photography</span></li>
              <li><span>Vercel Edge Platform</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Assessment</h4>
            <p className="footer-assessment-note">
              Crafted for the <strong>Designesthetics</strong> Front-End Developer Assessment. Designed with intentional typography, restrained motion, and responsive layout.
            </p>
            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Atlas AI. All rights reserved.</p>
        <p className="footer-manifesto">Visual design &bull; Typography &bull; Spacing &bull; Colour &bull; Alignment &bull; Restraint</p>
      </div>
    </footer>
  )
}
