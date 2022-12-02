import React from 'react';
import Feedback from './feedback';
import HomeBottom from './home_bottom';
import HomeTop from './home_top';
import Footer from './footer';

const Home = () => {

    return (  
        <div className="home">
            <HomeTop />   
            <HomeBottom />
            <Feedback />
            <Footer />
        </div>
    );
}

 
export default Home;