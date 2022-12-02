import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

import Explore from "./explore";
import Home from './home';
import SignUp from "./signup";
import Login from "./login";
import CreateEvent from "./create_event";
import ProfilePage from "./profile";

function App() {
    return(
    <div className='app'>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/explore" element={<Explore />}/>
            <Route path="/create" element={<CreateEvent />}/>
            <Route path="/profile/:handle" element={<ProfilePage />}/>
        </Routes>
    </div>
  );
}

export default App;
