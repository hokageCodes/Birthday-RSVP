import { GiPartyHat } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import './navbar.css'


function Navbar() {
    return (
        <nav className='nav-section'>
            <div className="logo">
                <GiPartyHat className='logo-icon' />
                <h3>Celebrate with Us</h3>
            </div>
            <ul className="nav-links">
                <li>Event</li>
                <li>FAQs</li>
                <li>Gallery</li>
            </ul>
            <div className="rsvp-link">
                <button>RSVP</button>
            </div>
        </nav>
    )
}

export default Navbar