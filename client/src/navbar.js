import React from 'react';

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1>Evently</h1>
            <form className='navsearch'>
                <input type='text' placeholder='Search...'></input>
                <button type='submit'>Search</button>
            </form>
            <div className='links'> 
                <a href='/'>Dashboard</a>
                <a href='/explore'>Explore</a>
                <a href='/create'>Create Event</a>
                <a href='/'>Messages</a>
                <a href='/'>Profile</a>
            </div>
        </div>
    );
}
 
export default Navbar;