import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

type NavbarProps = {
  isScrolled: boolean
  destinationOnly?: boolean
  selectedDestinationId: string
}

export function Navbar({ isScrolled, destinationOnly = false, selectedDestinationId }: NavbarProps) {
  return (
    <nav className={`site-nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <Link className="brand" to="/" aria-label="Atlas AI home">
        <Compass size={20} />
        Atlas AI
      </Link>
      <div className="nav-links">
        <Link to="/explore">Explore</Link>
        <Link to={destinationOnly ? `/destination/${selectedDestinationId}#destination` : '#destination'}>
          Guide
        </Link>
        <a href="#planner">Planner</a>
      </div>
    </nav>
  )
}
