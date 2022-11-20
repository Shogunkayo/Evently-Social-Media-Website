import React from "react";
import { Route, Routes } from "react-router-dom";

import Explore from "./explore";
import Home from './home';
import SignUp from "./signup";
import Login from "./login";
import CreateEvent from "./create_event";

function App() {
  return(
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/explore" element={<Explore />}/>
        <Route path="/create" element={<CreateEvent />}/>
      </Routes>
    </div>
  );
}

export default App;
