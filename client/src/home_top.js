import React from 'react';
import { Link } from 'react-scroll';

const HomeTop = () => {
    return ( 
        <div className='hometop' id='hometop'>
            
            <div className='homenav'>
                <h1>Evently</h1>
                <div className='links'> 
                    <Link to='hometop' spy={true} smooth={true} offset={0} duration={500}>Home</Link>
                    <Link to='homebottom' spy={true} smooth={true} offset={-50} duration={500}>About Us</Link>
                    <Link to='feedback' spy={true} smooth={true} offset={-50} duration={500}>Feedback</Link>
                    <a href='/signup'>Sign-Up</a>
                    <a href='/login'>Login</a>
                </div>
            </div>

            <div className='homebody' id='homebody'>
                <div className='content'>
                    <h2>Events on your mind?</h2>
                    <h4>We just made organizing and joining events a whole lot easier!</h4>
                    <p>Want to see how? Sign-Up to get started!</p>
                    
                </div>
            </div>
            
            <div className='homefeatures'>
                <div className='search'>
                    <h3>1. Search Events</h3>
                    <p>
                        Search for events hosted in your community using the search bar and the explore page! Filter using location, time, duration and more...
                    </p>
                </div>
                <div className='join'>  
                    <h3>2. Join Events</h3>
                    <p>
                        Join any event you like! Contact the event organizer directly through our messaging system to know more...
                    </p>
                </div>
                <div className='organize'>
                    <h3>3. Organize Events</h3>
                    <p>
                        Create and host your very own event! We will provide all the tools to successfully manage your event in our website...
                    </p>
                </div>
            </div>

        </div>
 

    );
}
 
export default HomeTop;