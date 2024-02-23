import React from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} />
          <Route path="/" element={<Layout />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
