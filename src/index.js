import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/home';
import './assets/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter basename="/">
    <Routes>
      <Route exact path={`/user/:username`} element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </HashRouter>
);