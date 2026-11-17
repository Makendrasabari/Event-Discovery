import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top-accent-bar" />
      
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo-link" aria-label="Stackly Home">
              <img 
                src="/assets/stackly_087.webp?v=2" 
                alt="Stackly Events" 
                className="brand-logo-img" 
              />
            </Link>
            <p className="footer-desc">
              Stackly is the premier discovery and pass reservation platform for world-class technology summits, executive business forums, design sprints, and academic masterclasses.
            </p>
            <div className="footer-badges-row">
              <div className="footer-trust-badge">
                <ShieldCheck size={16} className="text-pink" />
                <span>Verified Passes</span>
              </div>
              <div className="footer-trust-badge">
                <Award size={16} className="text-pink" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="footer-social-row">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="footer-link">Explore All Events</Link>
              </li>
              <li>
                <Link to="/my-registrations" className="footer-link">My Registrations</Link>
              </li>
              <li>
                <Link to="/explore?filter=saved" className="footer-link">Saved Favourites</Link>
              </li>
              <li>
                <a href="#about" className="footer-link">About Stackly</a>
              </li>
              <li>
                <a href="#why-us" className="footer-link">Why Choose Us</a>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/explore?category=Technology" className="footer-link">
                  Technology & AI
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Business" className="footer-link">
                  Business & Fintech
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Design" className="footer-link">
                  UX & Product Design
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Education" className="footer-link">
                  Education & Research
                </Link>
              </li>
              <li>
                <Link to="/explore?location=Online" className="footer-link">
                  Virtual Masterclasses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Venue Information */}
          <div className="footer-col">
            <h4 className="footer-col-title">Global Headquarters</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon text-pink" />
                <span>555 Mission St, Suite 2400, San Francisco, CA 94105</span>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon text-pink" />
                <span>concierge@stacklyevents.com</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon text-pink" />
                <span>+1 (800) 582-STCK (7825)</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">
                  Support available 24/7 for attendees and conference speakers.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-copy">
            © {new Date().getFullYear()} Stackly Events Network. Designed with GenesisExpo inspiration. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#privacy" className="legal-link">Privacy Policy</a>
            <span className="dot-sep">•</span>
            <a href="#terms" className="legal-link">Terms of Service</a>
            <span className="dot-sep">•</span>
            <a href="#cookies" className="legal-link">Cookie Settings</a>
            <span className="dot-sep">•</span>
            <a href="#security" className="legal-link">Security Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
