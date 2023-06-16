import { useEffect, useState } from 'react';
import './countdown.css'

function Countdown() {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    
      useEffect(() => {
        const countdownDate = new Date('July 29, 2023 00:00:00').getTime();
    
        const updateCountdown = () => {
          const now = new Date().getTime();
          const distance = countdownDate - now;
    
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
          setCountdown({ days, hours, minutes, seconds });
        };
    
        const interval = setInterval(updateCountdown, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);

      return(
        <div className="hero-timer">
            <div className="timer-block">
                <div className="timer-value">{countdown.days}</div>
                <div className="timer-label">Days</div>
            </div>
            <div className="timer-block">
                <div className="timer-value">{countdown.hours}</div>
                <div className="timer-label">Hours</div>
            </div>
            <div className="timer-block">
                <div className="timer-value">{countdown.minutes}</div>
                <div className="timer-label">Minutes</div>
            </div>
            <div className="timer-block">
                <div className="timer-value">{countdown.seconds}</div>
                <div className="timer-label">Seconds</div>
            </div>
        </div>
      )
}

export default Countdown