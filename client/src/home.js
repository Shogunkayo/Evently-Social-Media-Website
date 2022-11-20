import React from 'react';
import Feedback from './feedback';
import HomeBottom from './home_bottom';
import HomeTop from './home_top';


const Home = () => {

    return (  
        <div className="home">
            <HomeTop />   
            <HomeBottom />
            <Feedback />
        </div>
    );
}

 
export default Home;