import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import DemoDetailing from './pages/demos/DemoDetailing';
import DemoFurniture from './pages/demos/DemoFurniture';
import DemoCoffee from './pages/demos/DemoCoffee';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/detailing" element={<DemoDetailing />} />
        <Route path="/demo/furniture" element={<DemoFurniture />} />
        <Route path="/demo/coffee" element={<DemoCoffee />} />
      </Routes>
    </>
  );
}

export default App;