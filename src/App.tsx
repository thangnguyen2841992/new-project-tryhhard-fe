import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActiveAccount from "./layout/auth/ActiveAccount";
import Register from "./layout/auth/Register";
import Login from "./layout/auth/Login";
import Home from "./layout/post/Home";
import About from "./layout/post/About";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path = "/active/:email/:activeCode" element={<ActiveAccount/>}></Route>
                    <Route path = "/about/:accountId" element={<About/>}></Route>
                    <Route path = "/register" element={<Register/>}></Route>
                    <Route path = "/login" element={<Login/>}></Route>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
