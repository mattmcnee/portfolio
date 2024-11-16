import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.scss';
import menuIcon from '/src/assets/icons/menu.svg';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      if (newIsMobile) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false); // Close the dropdown on scroll
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => (
    <>
        {location.pathname !== '/' && (
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        )}
        <Link to="/map" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Map</Link>
                
        {location.pathname !== '/beta' && (
            <Link to="/beta" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Join Beta</Link>
        )}
        {location.pathname !== '/login' && (
            <div onClick={handleLogin} className="navbar-link">Login</div>
        )}
        {location.pathname !== '/signup' && (
            <div onClick={handleSignup} className="navbar-link">Sign up</div>
        )}
    </>
  );

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <img src="/favicon.png" alt="Logo" />
          <div className="logo-name">Matt McNee</div>
        </div>
        {isMobile ? (
          <button className="menu-toggle" onClick={toggleMenu}>
            <img src={menuIcon} alt="Toggle Menu Icon" />
          </button>
        ) : (
          <div className="navbar-links">
            <NavLinks />
          </div>
        )}
      </nav>
      {isMobile && (
        <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
          <NavLinks />
        </div>
      )}
    </div>
  );
};

export default Navbar;