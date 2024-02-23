import React from 'react';
import logo from './images/authentication.png';
import './App.scss';
import Layout from './components/Layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
      </header>*/}
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
