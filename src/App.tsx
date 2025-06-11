import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActiveAccount from "./layout/auth/ActiveAccount";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
                <Routes>
                    <Route path = "/active/:email/:activeCode" element={<ActiveAccount/>}></Route>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
