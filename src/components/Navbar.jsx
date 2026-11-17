import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Ticket, 
  Heart, 
  User, 
  LogIn, 
  LogOut, 
  Calendar,
  Compass,
  Home as HomeIcon,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  const { 
    registrations, 
    favourites, 
    user, 
    setUser, 
    setAuthModalOpen, 
    addToast 
  } = useApp();

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setUser(null);
    setUserDropdownOpen(false);
    addToast('info', 'Logged Out', 'You have been successfully signed out.');
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="header-inner">
            {/* Logo Section */}
            <Link to="/" className="brand-logo-link" aria-label="Stackly Home">
              <img 
                src="/assets/stackly_087.webp?v=3" 
                alt="Stackly Events" 
                className="brand-logo-img" 
              />
            </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <HomeIcon size={16} />
              <span>Home</span>
            </NavLink>

            <NavLink 
              to="/explore" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Compass size={16} />
              <span>Explore Events</span>
            </NavLink>

            <NavLink 
              to="/my-registrations" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Ticket size={16} />
              <span>My Registrations</span>
              {registrations.length > 0 && (
                <span className="badge-pill">{registrations.length}</span>
              )}
            </NavLink>
          </nav>

          {/* Desktop Right Action Area */}
          <div className="desktop-actions">
            {/* Quick Favourites Link */}
            <Link 
              to="/explore?filter=saved" 
              className="icon-action-btn"
              title="Saved Favourites"
              aria-label="View Saved Events"
            >
              <Heart size={19} className={favourites.length > 0 ? "text-pink fill-pink" : ""} />
              {favourites.length > 0 && (
                <span className="mini-dot-count">{favourites.length}</span>
              )}
            </Link>

            {/* Auth / User Profile */}
            {user ? (
              <div className="user-profile-menu">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="user-profile-btn"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name-label">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`dropdown-chevron ${userDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-popover">
                    <div className="dropdown-header">
                      <p className="dropdown-name">{user.name}</p>
                      <p className="dropdown-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider" />
                    <Link 
                      to="/my-registrations" 
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Ticket size={15} />
                      <span>My Passes ({registrations.length})</span>
                    </Link>
                    <Link 
                      to="/explore" 
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Compass size={15} />
                      <span>Discover Workshops</span>
                    </Link>
                    <div className="dropdown-divider" />
                    <button 
                      onClick={handleLogout} 
                      className="dropdown-item text-red"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="btn-auth-primary"
              >
                <LogIn size={16} />
                <span>Login / Register</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile Drawer Backdrop & Drawer */}
      <div 
        className={`mobile-drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <Link to="/" onClick={() => setIsOpen(false)} className="drawer-logo">
            <img 
              src="/assets/stackly_087.webp" 
              alt="Stackly Events" 
              className="brand-logo-img-mobile" 
            />
          </Link>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="drawer-close-btn"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="drawer-body">
          <nav className="mobile-nav-list">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <HomeIcon size={18} />
              <span>Home</span>
            </NavLink>

            <NavLink 
              to="/explore" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Compass size={18} />
              <span>Explore Events</span>
            </NavLink>

            <NavLink 
              to="/my-registrations" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Ticket size={18} />
              <span>My Registrations</span>
              {registrations.length > 0 && (
                <span className="badge-pill ml-auto">{registrations.length}</span>
              )}
            </NavLink>

            <NavLink 
              to="/explore?filter=saved" 
              className="mobile-nav-item"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={18} className={favourites.length > 0 ? "text-pink" : ""} />
              <span>Saved Favourites</span>
              {favourites.length > 0 && (
                <span className="badge-pill ml-auto">{favourites.length}</span>
              )}
            </NavLink>
          </nav>

          <div className="drawer-footer">
            {user ? (
              <div className="drawer-user-card">
                <div className="user-info-row">
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="btn-drawer-logout"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setAuthModalOpen(true);
                }}
                className="btn-drawer-auth"
              >
                <LogIn size={18} />
                <span>Login or Sign Up</span>
              </button>
            )}

            <div className="drawer-tagline">
              <Sparkles size={14} className="text-pink" />
              <span>GenesisExpo Powered Experience</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
