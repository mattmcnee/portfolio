import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from '/src/pages/Home';

const App = () => {
  const pageRef = useRef(null);

  // 1vh fix for mobile browsers
  useEffect(() => {
    const updateViewportHeight = () => {
      const windowHeight = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${windowHeight * 0.01}px`);
      if (window.scrollY === 0 || window.innerWidth > 768) {
        document.documentElement.style.setProperty('--vh-page-top-only', `${windowHeight * 0.01}px`);
      }   
    }; 
    updateViewportHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateViewportHeight();
    });

    if (pageRef.current) {
      resizeObserver.observe(pageRef.current);
    }

    window.addEventListener('scroll', updateViewportHeight); 
    window.addEventListener('resize', updateViewportHeight);

    return () => {
      if (pageRef.current) {
        resizeObserver.unobserve(pageRef.current);
      }
      window.removeEventListener('scroll', updateViewportHeight);
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, [pageRef]);  

  return (
    <div id="page" ref={pageRef}>
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
