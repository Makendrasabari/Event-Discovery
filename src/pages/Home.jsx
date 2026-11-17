import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Users, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Star, 
  Mail, 
  ChevronRight,
  Flame,
  Search
} from 'lucide-react';
import { EVENTS, CATEGORIES, SPEAKERS, TESTIMONIALS, STATS, WHY_CHOOSE_US } from '../data/eventsData';
import EventCard from '../components/EventCard';
import CategoryCard from '../components/CategoryCard';
import SpeakerCard from '../components/SpeakerCard';
import CountdownTimer from '../components/CountdownTimer';
import AnimatedHeading from '../components/AnimatedHeading';
import CountUp from '../components/CountUp';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { openRegistrationModal, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [upcomingCategory, setUpcomingCategory] = useState('All');

  // Shuffle and Arrange animation for Categories section
  const categoriesSectionRef = useRef(null);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCategoriesVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (categoriesSectionRef.current) {
      observer.observe(categoriesSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Staggered Arrange animation for About section (Images & Live Counter)
  const aboutSectionRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Staggered Arrange animation for Upcoming Events cards
  const upcomingSectionRef = useRef(null);
  const [upcomingVisible, setUpcomingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUpcomingVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (upcomingSectionRef.current) {
      observer.observe(upcomingSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleUpcomingCategoryChange = (cat) => {
    setUpcomingCategory(cat);
    setUpcomingVisible(false);
    setTimeout(() => {
      setUpcomingVisible(true);
    }, 50);
  };

  // Staggered Arrange animation for Why Choose Us cards
  const whySectionRef = useRef(null);
  const [whyVisible, setWhyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhyVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (whySectionRef.current) {
      observer.observe(whySectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Major Hero Event
  const heroEvent = EVENTS.find(e => e.isMajorUpcoming) || EVENTS[0];

  // Featured Events (3-4 top events)
  const featuredEvents = EVENTS.filter(e => e.isFeatured).slice(0, 3);

  // Filtered Upcoming Events
  const upcomingEvents = upcomingCategory === 'All' 
    ? EVENTS.slice(0, 6) 
    : EVENTS.filter(e => e.category === upcomingCategory).slice(0, 6);

  // Featured Workshops (Hands-on masterclasses)
  const workshopEvents = EVENTS.filter(e => e.type.includes('Workshop') || e.type.includes('Masterclass')).slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid email address (e.g. name@company.com).');
      return;
    }
    setNewsletterError('');
    addToast('success', 'Subscribed to Stackly Dispatch', 'Thank you! You will receive early keynote alerts and ticket drops.');
    setNewsletterEmail('');
  };

  const iconMap = {
    Award,
    Users,
    Compass,
    Zap,
    ShieldCheck,
    Globe
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-media">
          <img 
            src={heroEvent.bannerImage || "/assets/general/hero_event.webp"} 
            alt="Stackly Major Summit" 
            className="hero-bg-img"
          />
          <div className="hero-overlay-gradient" />
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            {/* Top Conference Highlight Pill */}
            <div className="hero-badge-pill">
              <Sparkles size={14} className="text-pink animate-pulse shrink-0" />
              <span>GenesisExpo Spotlight • Global 2026</span>
            </div>

            {/* Main Headline */}
            <AnimatedHeading as="h1" className="hero-title">
              Connect With the Minds <span className="text-gradient-pink">Shaping Tomorrow's Tech</span>
            </AnimatedHeading>

            {/* Sub-headline */}
            <p className="hero-description">
              Stackly curates the world's most influential technology summits, developer conferences, executive roundtables, and hands-on design masterclasses.
            </p>

            {/* Featured Event Floating Card */}
            <div className="hero-event-callout">
              <div className="hero-callout-header">
                <span className="callout-tag">Next Major Gathering</span>
                <span className="callout-date">
                  <Calendar size={13} className="inline mr-1 text-pink" />
                  {heroEvent.formattedDate}
                </span>
              </div>
              <AnimatedHeading as="h2" className="hero-callout-title">{heroEvent.title}</AnimatedHeading>
              <p className="hero-callout-venue">
                <MapPin size={14} className="inline mr-1 text-pink" />
                {heroEvent.venue} ({heroEvent.location})
              </p>

              {/* Countdown Timer */}
              <div className="hero-countdown-wrap">
                <div className="countdown-caption">Summit Begins In:</div>
                <CountdownTimer targetDate="2026-12-14T09:00:00" />
              </div>

              {/* Action Buttons */}
              <div className="hero-actions-row">
                <Link to="/explore" className="btn-primary hero-btn-primary">
                  <span>Explore All Events</span>
                  <ArrowRight size={17} />
                </Link>
                <button 
                  onClick={() => openRegistrationModal(heroEvent)}
                  className="btn-hero-register"
                >
                  <span>Reserve Pass ({heroEvent.price})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Quick Search Strip - Bridge Section */}
      <div className="hero-quick-strip-section">
        <div className="container">
          <div className="quick-strip-card">
            <div className="strip-item">
              <Calendar size={18} className="text-pink shrink-0" />
              <div>
                <span className="strip-label">Upcoming Season</span>
                <strong className="strip-val">Winter & Spring 2026/27</strong>
              </div>
            </div>
            <div className="strip-divider" />
            <div className="strip-item">
              <MapPin size={18} className="text-pink shrink-0" />
              <div>
                <span className="strip-label">Host Cities</span>
                <strong className="strip-val">SF, NY, London, Tokyo, Berlin</strong>
              </div>
            </div>
            <div className="strip-divider" />
            <div className="strip-item">
              <Users size={18} className="text-pink shrink-0" />
              <div>
                <span className="strip-label">Community</span>
                <strong className="strip-val">50,000+ Verified Leaders</strong>
              </div>
            </div>
            <div className="strip-divider" />
            <Link to="/explore" className="btn-strip-cta">
              <Search size={16} />
              <span>Find Events</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. POPULAR CATEGORIES SECTION */}
      <section id="categories" ref={categoriesSectionRef} className="section-categories py-20 bg-white">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-tag-pill">
              <Compass size={14} className="text-pink" />
              <span>Specialized Tracks</span>
            </div>
            <AnimatedHeading as="h2" className="section-title">Popular Event Categories</AnimatedHeading>
            <p className="section-subtitle">
              Browse world-class gatherings across specialized discipline tracks tailored for engineers, executives, designers, and academics.
            </p>

            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setCategoriesVisible(false);
                  setTimeout(() => setCategoriesVisible(true), 60);
                }}
                className="why-replay-btn"
                title="Replay card shuffle & arrange animation"
              >
                <Sparkles size={13} className="text-pink" />
                <span>Shuffle & Arrange</span>
              </button>
            </div>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((category, idx) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                index={idx}
                isArranged={categoriesVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED EVENTS SECTION */}
      <section className="section-featured py-20 bg-slate-50">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-tag-pill">
                <Flame size={14} className="text-pink" />
                <span>Hand-Picked Excellence</span>
              </div>
              <AnimatedHeading as="h2" className="section-title">Featured Summits & Conferences</AnimatedHeading>
              <p className="section-subtitle">
                High-demand flagship conferences with world-renowned keynote speakers and limited seating.
              </p>
            </div>
            <Link to="/explore" className="btn-secondary self-start md:self-auto">
              <span>View All Events</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="events-grid">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT STACKLY EVENTS SECTION */}
      <section id="about" ref={aboutSectionRef} className="section-about py-24 bg-white">
        <div className="container">
          <div className="about-split-grid">
            {/* Visual media cluster */}
            <div className="about-media-cluster">
              <div className={`about-img-primary-wrap ${aboutVisible ? 'is-arranged' : ''}`}>
                <img 
                  src="/assets/general/about_conference.webp" 
                  alt="Stackly Conference Stage" 
                  className="about-img-primary"
                  loading="lazy"
                />
                <div className={`about-media-accent-box ${aboutVisible ? 'is-arranged' : ''}`}>
                  <CountUp value="12+" isStarted={aboutVisible} className="accent-box-num" />
                  <span className="accent-box-label">Years Curating World-Class Summits</span>
                </div>
              </div>
              <div className={`about-img-secondary-wrap ${aboutVisible ? 'is-arranged' : ''}`}>
                <img 
                  src="/assets/general/about_workshop.webp" 
                  alt="Interactive Workshop" 
                  className="about-img-secondary"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content text */}
            <div className="about-text-content">
              <div className="section-tag-pill">
                <Sparkles size={14} className="text-pink" />
                <span>About Stackly Events</span>
              </div>
              <AnimatedHeading as="h2" className="section-title">
                Redefining the Professional Conference Experience
              </AnimatedHeading>
              <p className="about-lead">
                Inspired by the GenesisExpo standard of architectural elegance, Stackly connects modern thinkers, creators, and enterprise architects with high-signal educational opportunities.
              </p>
              <p className="about-body">
                We believe that the most transformative industry breakthroughs occur when interdisciplinary leaders gather in thoughtful physical and virtual spaces. From intimate 30-person code clinics to 3,000-seat keynote arenas, every Stackly event guarantees vetted speakers, transparent agendas, and verifiable certificates.
              </p>

              {/* Key check items */}
              <div className="about-checklist">
                <div className="check-item">
                  <CheckCircle2 size={18} className="text-pink shrink-0" />
                  <span>Strict zero-vendor-pitch keynote selection policy</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="text-pink shrink-0" />
                  <span>Instant verifiable digital passes & certificate generation</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="text-pink shrink-0" />
                  <span>Curated executive networking suites and peer roundtables</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="about-stats-grid">
                {STATS.map((stat, i) => (
                  <div key={i} className="about-stat-item">
                    <span className="stat-number">
                      <CountUp value={stat.value} isStarted={aboutVisible} />
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS SECTION */}
      <section id="upcoming" ref={upcomingSectionRef} className="section-upcoming py-20 bg-slate-50">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-tag-pill">
              <Calendar size={14} className="text-pink" />
              <span>Full Schedule</span>
            </div>
            <AnimatedHeading as="h2" className="section-title">Upcoming Events & Masterclasses</AnimatedHeading>
            <p className="section-subtitle">
              Filter by discipline and secure your digital pass before allocations reach capacity.
            </p>

            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setUpcomingVisible(false);
                  setTimeout(() => setUpcomingVisible(true), 60);
                }}
                className="why-replay-btn"
                title="Replay card arrange animation"
              >
                <Sparkles size={13} className="text-pink" />
                <span>Replay Arrange Animation</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="upcoming-category-filters">
              {['All', 'Technology', 'Business', 'Design', 'Education'].map(cat => (
                <button
                  key={cat}
                  onClick={() => handleUpcomingCategoryChange(cat)}
                  className={`filter-pill-btn ${upcomingCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event, idx) => (
              <EventCard 
                key={event.id} 
                event={event} 
                className={`upcoming-arrange-card ${upcomingVisible ? 'is-arranged' : ''}`}
                style={{
                  transitionDelay: upcomingVisible ? `${idx * 140}ms` : '0ms'
                }}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/explore" className="btn-primary">
              <span>View All 12+ Events</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section id="why-us" ref={whySectionRef} className="section-why-us py-24 bg-white">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-tag-pill">
              <Award size={14} className="text-pink" />
              <span>The Stackly Difference</span>
            </div>
            <AnimatedHeading as="h2" className="section-title">Why Attend Stackly Conferences?</AnimatedHeading>
            <p className="section-subtitle">
              Engineered from the ground up for ambitious professionals who value time, substance, and meaningful peer connections.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setWhyVisible(false);
                  setTimeout(() => setWhyVisible(true), 60);
                }}
                className="why-replay-btn"
                title="Replay card arrange animation"
              >
                <Sparkles size={13} className="text-pink" />
                <span>Replay Arrange Animation</span>
              </button>
            </div>
          </div>

          <div className="why-us-grid">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Award;
              return (
                <div 
                  key={idx} 
                  className={`why-card ${whyVisible ? 'is-arranged' : ''}`}
                  style={{ transitionDelay: whyVisible ? `${idx * 160}ms` : '0ms' }}
                >
                  {/* Hover Image Reveal Layer */}
                  <div className="why-card-bg-wrap">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="why-card-bg-img"
                      loading="lazy"
                    />
                    <div className="why-card-bg-overlay" />
                  </div>

                  {/* Card Content Body */}
                  <div className="why-card-inner">
                    <div className="why-icon-bubble">
                      <IconComp size={24} className="why-icon" />
                    </div>
                    <h3 className="why-title">{item.title}</h3>
                    <p className="why-desc">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FEATURED WORKSHOPS & CONFERENCES SECTION */}
      <section className="section-workshops py-20 bg-slate-50">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-tag-pill">
                <Zap size={14} className="text-pink" />
                <span>Hands-on Learning</span>
              </div>
              <AnimatedHeading as="h2" className="section-title">Featured Workshops & Deep Dives</AnimatedHeading>
              <p className="section-subtitle">
                Intensive, small-cohort masterclasses featuring practical code clinics, Figma tear-downs, and investment modeling.
              </p>
            </div>
            <Link to="/explore?category=Design" className="btn-secondary self-start md:self-auto">
              <span>Browse Workshops</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="events-grid">
            {workshopEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. WORLD-CLASS SPEAKERS SHOWCASE - CONTINUOUS LIVE HORIZONTAL RUNNING MARQUEE */}
      <section className="section-speakers py-24 bg-white">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-tag-pill">
              <Users size={14} className="text-pink" />
              <span>Global Visionaries</span>
            </div>
            <AnimatedHeading as="h2" className="section-title">Meet Our Keynote Speakers</AnimatedHeading>
            <p className="section-subtitle">
              Learn directly from Chief Scientists, Design Directors, and Managing Partners defining the modern industry.
            </p>
          </div>
        </div>

        {/* Continuous Horizontal Live Running Track */}
        <div className="speakers-marquee-wrapper">
          <div className="speakers-marquee-track">
            {[...SPEAKERS, ...SPEAKERS, ...SPEAKERS].map((speaker, index) => (
              <div key={`${speaker.id}-${index}`} className="speaker-marquee-item">
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        </div>

        {/* Live Indicator */}
        <div className="text-center mt-8">
          <span className="marquee-pause-hint">
            <span className="live-dot" />
            <span>Live continuous stream • Hover over any speaker to pause</span>
          </span>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION - CONTINUOUS LIVE RUNNING MARQUEE */}
      <section className="section-testimonials py-24 bg-slate-50">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-tag-pill">
              <Star size={14} className="text-pink fill-pink" />
              <span>Live Attendee Feedback</span>
            </div>
            <AnimatedHeading as="h2" className="section-title">Trusted by Thousands of Leaders</AnimatedHeading>
            <p className="section-subtitle">
              Verified reviews from founders, engineering directors, and product leaders who attend Stackly conferences.
            </p>
          </div>
        </div>

        {/* Continuous Horizontal Live Running Track */}
        <div className="testimonials-marquee-wrapper">
          <div className="testimonials-marquee-track">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((test, index) => (
              <div key={`${test.id}-${index}`} className="testimonial-card">
                <div className="rating-stars">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-pink text-pink" />
                  ))}
                </div>
                <p className="testimonial-quote">"{test.quote}"</p>
                <div className="testimonial-author">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="author-avatar"
                    loading="lazy"
                  />
                  <div className="author-meta">
                    <h4 className="author-name">{test.name}</h4>
                    <p className="author-role">{test.role}, {test.company}</p>
                    <span className="author-attended-tag">{test.eventAttended}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Indicator */}
        <div className="text-center mt-8">
          <span className="marquee-pause-hint">
            <span className="live-dot" />
            <span>Live continuous stream • Hover over any card to pause</span>
          </span>
        </div>
      </section>

      {/* 10. NEWSLETTER SUBSCRIPTION SECTION */}
      <section className="section-newsletter py-20 bg-white">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-glow-ring" />
            <div className="newsletter-content">
              <div className="newsletter-badge">
                <Sparkles size={14} className="text-pink" />
                <span>Stay Ahead of the Curve</span>
              </div>
              <AnimatedHeading as="h2" className="newsletter-title">Subscribe to the Stackly Dispatch</AnimatedHeading>
              <p className="newsletter-desc">
                Receive weekly conference announcements, speaker line-ups, exclusive early-bird registration codes, and free workshop replays.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="newsletter-form" noValidate>
                <div className="newsletter-input-wrapper">
                  <div className="newsletter-input-group">
                    <Mail size={18} className="newsletter-input-icon text-slate-400" />
                    <input
                      type="text"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError('');
                      }}
                      placeholder="Enter your professional email address"
                      className={`newsletter-input ${newsletterError ? 'has-error' : ''}`}
                    />
                  </div>
                  {newsletterError && (
                    <div className="newsletter-redline-error">
                      <div className="redline-bar" />
                      <span className="redline-text">{newsletterError}</span>
                    </div>
                  )}
                </div>
                <button type="submit" className="btn-newsletter">
                  <span>Subscribe Now</span>
                </button>
              </form>

              <div className="newsletter-guarantee">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>No spam. Unsubscribe anytime with a single click.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
