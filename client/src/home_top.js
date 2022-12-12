import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import { logout, reset } from './features/auth/authSlice'; 

import about_btn from './images/about.png'
import home_btn from './images/home.png'
import logout_btn from './images/logout.png'
import feedback_btn from './images/feedback.png'
import signup_btn from './images/signup.png'
import login_btn from './images/login.png'

const HomeTop = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth)

    const handleClick = () => {
        navigate('/signup')
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return ( 
        <div className='hometop' id='hometop'>
            
            <div className='navbar'>
                <h1>Evently</h1>
                <div className='links'> 
                    <Link to='hometop' spy={true} smooth={true} offset={0} duration={500}><div className='links-first'><img src={home_btn} alt='navbar'></img></div></Link>
                    <Link to='homebottom' spy={true} smooth={true} offset={-50} duration={500}><div className='links-about'><img src={about_btn} alt='navbar'></img></div></Link>
                    <Link to='feedback' spy={true} smooth={true} offset={-50} duration={500}><div className='links-feedback'><img src={feedback_btn} alt='navbar'></img></div></Link>
                    {!user && <a href='/signup'><div className='links-signup'><img src={signup_btn} alt='navbar'></img></div></a>}
                    {!user &&<a href='/login'><div className='links-login'><img src={login_btn} alt='navbar'></img></div></a>}
                    {user && <div className='links-last'  onClick={onLogout}><button className='logout' onClick={onLogout}><img src={logout_btn} alt='navbar'></img></button></div>}
                </div>
            </div>

            <div className='homebody' id='homebody'>
                <div className='content'>
                    <h2>Events on your mind?</h2>
                    <h4>We just made organizing and joining events a whole lot easier!</h4>
                    <p>Want to see how?</p>
                    <button onClick={handleClick} className='get-started'> Get Started!</button>
                    
                </div>
            </div>
            
            <div className='homefeatures'>
                <div className='search'>
                    <div>
                        <img src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/null/external-search-location-wanicon-two-tone-wanicon.png" alt='search'/>
                    </div>
                    <div>
                        <h3>Search Events</h3>
                        <p>
                            Search for events hosted in your community using the search bar and the explore page! Filter using location, time, duration and more...
                        </p>
                    </div>
                </div>
                <div className='join'> 
                    <div>
                        <img src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/null/external-community-friendship-wanicon-two-tone-wanicon.png" alt='join'/>                
                    </div>
                    <div>
                        <h3>Join Events</h3>
                        <p>
                            Join any event you like! Contact the event organizer directly through our messaging system to know more...
                        </p>
                    </div>
                </div>
                <div className='organize'>
                    <div>
                        <img src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/null/external-list-work-at-home-wanicon-two-tone-wanicon.png" alt='organize'/>
                    </div>
                    <div>
                        <h3>Organize Events</h3>
                        <p>
                            Create and host your very own event! We will provide all the tools to successfully manage your event in our website...
                        </p>
                    </div>
                </div>
            </div>

        </div>
 

    );
}
 
export default HomeTop;