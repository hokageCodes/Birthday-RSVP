import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
// import { GiPartyHat } from 'react-icons/gi';
import { NavLink } from 'react-router-dom'
import './navbar.css';
import Hero from '../hero/Hero';

export default function Navbar() {
    const [toggleNav, setToggleNav] = useState(false);

    const handleToggleNav = () => {
        setToggleNav(!toggleNav)
    }
    return (
        <>

            <nav className="navbar">
                <div className="navbar__logo">
                    <NavLink
                        className="no-list"
                        exact to="/">
                            Yomi&amp;Emelda
                    </NavLink>
                </div>
                <ul className={toggleNav ? "navbar__list active" : "navbar__list"}>
                    <li className="navbar__item">
                        <NavLink
                            exact
                            to="/event"
                            activeClassName="navbar__item--active"
                            onClick={handleToggleNav}
                            className="no-list"
                        >
                            Event
                        </NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink
                            exact
                            to="/faqs"
                            activeClassName="navbar__item--active"
                            onClick={handleToggleNav}
                            className="no-list"
                        >
                            FAQs
                        </NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink
                            exact
                            to="/gallery"
                            activeClassName="navbar__item--active"
                            onClick={handleToggleNav}
                            className="no-list"
                        >
                            Gallery
                        </NavLink>
                    </li>
                    {/* <li className="navbar__item">
                        <NavLink
                            exact
                            to="/games"
                            activeClassName="navbar__item--active"
                            onClick={handleToggleNav}
                        >
                            FAQs
                        </NavLink>
                    </li> */}
                    <div className="rsvp-link">
                        <button>RSVP</button>
                    </div>
                </ul>
                <div className="navbar__icon" onClick={handleToggleNav}>
                    {toggleNav ? <FaTimes /> : <FaBars />}
                </div>
            </nav>
            <Hero />
        </>
    )
}