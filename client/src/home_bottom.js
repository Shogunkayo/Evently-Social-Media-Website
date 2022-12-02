import React from 'react';

import gautham from './images/gautham.jpeg'
import gagan from './images/gagan.jpeg'
import ganesh from './images/ganesh.jpg'

const HomeBottom = () => {
    return ( 
        <div className='homebottom' id='homebottom'>
            <div className='abouthead'>
                <h1>About Us</h1>
            </div>

            <div className='about-content'>
                <div className='about-description'>
                    <p>We are a group of computer science students studying in PES University. This website is a mini-project created by us for the course Web Technologies in 3rd semester.
                    </p>
                </div>

                <div className='profiles'>
                    <div className='gautham'>
                        <img src = {gautham} alt='img1'></img>
                        <h2>Gautham</h2>
                        <a href='https://github.com/Shogunkayo'>https://github.com/Shogunkayo</a>
                    </div>
                    <div className='ganesh'>
                        <img src = {ganesh} alt='img2'></img>
                        <h2>Ganesh</h2>
                        <a href='https://github.com/thehyena24'>https://github.com/thehyena24</a>
                    </div>
                    <div className='gagan'>
                        <img src = {gagan} alt='img3'></img>
                        <h2>Gagan</h2>
                        <a href='https://github.com/gaganhr94'>https://github.com/gaganhr94</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default HomeBottom;