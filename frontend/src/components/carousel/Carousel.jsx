import React from 'react';
import Slider from 'infinite-react-carousel';
import './carousel.css';

const SimpleSlider = () => (
  <div className="slider__container">
    <div className="event-info-text">
      <h2>Event Location and Details</h2>
      <p>
        You're invited to celebrate with us on Saturday, May 14th, 2022 at 7:00pm. The event will be held at the Grand Ballroom at the Plaza Hotel, 768 5th Ave, New York, NY 10019.
      </p>
      <p>
        There will be dinner, dancing, and lots of fun memories to be made. Dress code is formal attire.
      </p>
      <div className="rsvp-link">
          <button>RSVP</button>
      </div>
    </div>
    <Slider dots className="sliding">
      <div>
        <img src="https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event Image 1" />
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event Image 2" />
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1071883/pexels-photo-1071883.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event Image 3" />
      </div>
      <div>
        <img src="https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event Image 4" />
      </div>
      <div>
        <img src="https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event Image 5" />
      </div>
    </Slider>
  </div>
);

export default SimpleSlider;
