import React from 'react';
import { Link } from 'react-scroll';

const NavbarOld = () => {
    return (
    <div className='homenav'>
        <h1>Evently</h1>
        <div className='links'> 
            <Link to='hometop' spy={true} smooth={true} offset={0} duration={500}>Home</Link>
            <Link to='homebottom' spy={true} smooth={true} offset={-100} duration={500}>About Us</Link>
            <a href='/'>Sign-Up</a>
            <a href='/'>Login</a>
        </div>
    </div>
    )}
 
export default NavbarOld;