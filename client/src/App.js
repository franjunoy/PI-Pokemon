import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage";



function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/detail/:id' element={<DetailPage />} />
                <Route path='/form' element={<FormPage />} />
            </Routes>
        </div>
    );
}

export default App;