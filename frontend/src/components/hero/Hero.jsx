import Countdown from '../countdown/countdown';
import './hero.css'

    function Hero() {
    return (
        <section className='hero-container'>
            <div className="hero-content">
                <h1 className="hero-title">
                    Celebrate and Party with Us!
                </h1>
                <p className="hero-description">
                    Join us for a fun-filled evening of celebration, and lots of laughter.
                    It's going to be a blast!
                </p>
                <Countdown />
                <div className="hero-rsvp-link">
                    <button>RSVP</button>
                </div>
            </div>
        </section>
    )
    }

    export default Hero;