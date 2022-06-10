import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Config from './assets/config.json';
import Home from './pages/home/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path={`${Config.HOMEPAGE_PREFIX}:username`} element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </BrowserRouter>
);