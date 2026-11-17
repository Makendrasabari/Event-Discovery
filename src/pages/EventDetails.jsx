import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Ticket, 
  Award, 
  ShieldCheck, 
  Globe, 
  Coffee,
  ChevronRight,
  Info
} from 'lucide-react';
import { EVENTS, SPEAKERS } from '../data/eventsData';
import SpeakerCard from '../components/SpeakerCard';
import CountdownTimer from '../components/CountdownTimer';
import { useApp } from '../context/AppContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    isRegistered, 
    toggleFavourite, 
    isFavourite, 
    openRegistrationModal, 
    addToast 
  } = useApp();

  const event = useMemo(() => {
    return EVENTS.find(e => e.id === id);
  }, [id]);

  if (!event) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <p className="text-slate-600 mt-2 mb-6">The conference or workshop you requested does not exist or has concluded.</p>
        <Link to="/explore" className="btn-primary inline-flex">
          <ArrowLeft size={16} />
          <span>Back to All Events</span>
        </Link>
      </div>
    );
  }

  const saved = isFavourite(event.id);
  const registered = isRegistered(event.id);

  // Seat metrics
  const seatsReservedPct = Math.round(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100);
  const isUrgent = event.availableSeats <= 20;

  // Resolved speaker objects
  const eventSpeakers = (event.speakers || []).map(spId => {
    return SPEAKERS.find(s => s.id === spId);
  }).filter(Boolean);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', 'Link Copied', 'Event link copied to clipboard.');
    } else {
      addToast('info', 'Share Event', window.location.href);
    }
  };

  return (
    <div className="event-details-page">
      {/* Breadcrumb Navigation Bar */}
      <div className="details-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link to="/explore" className="breadcrumb-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>
          <div className="breadcrumb-crumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link to="/explore">Explore</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link to={`/explore?category=${event.category}`}>{event.category}</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="crumb-active">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Large Hero Banner */}
      <section className="details-hero-banner">
        <div className="details-banner-media">
          <img
            src={event.bannerImage || event.image}
            alt={event.title}
            className="details-banner-img"
          />
          <div className="details-banner-overlay" />
        </div>

        <div className="container details-banner-container">
          <div className="details-banner-badges">
            <span className={`badge-category badge-${event.category.toLowerCase()}`}>
              {event.category}
            </span>
            <span className="badge-type-pill">
              {event.type}
            </span>
            {registered && (
              <span className="badge-registered-status">
                <CheckCircle2 size={14} />
                <span>You Have a Pass</span>
              </span>
            )}
          </div>

          <h1 className="details-title">{event.title}</h1>
          <p className="details-tagline">{event.tagline || event.shortDescription}</p>

          <div className="details-meta-strip">
            <div className="meta-strip-item">
              <Calendar size={18} className="text-pink shrink-0" />
              <div>
                <span className="meta-label">Date</span>
                <strong className="meta-value">{event.formattedDate}</strong>
              </div>
            </div>
            <div className="meta-strip-divider" />
            <div className="meta-strip-item">
              <Clock size={18} className="text-pink shrink-0" />
              <div>
                <span className="meta-label">Time & Duration</span>
                <strong className="meta-value">{event.time}</strong>
              </div>
            </div>
            <div className="meta-strip-divider" />
            <div className="meta-strip-item">
              <MapPin size={18} className="text-pink shrink-0" />
              <div>
                <span className="meta-label">Venue & Host City</span>
                <strong className="meta-value">{event.location}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="container details-main-grid py-14">
        {/* Left Column: Details, Highlights, Agenda, Speakers */}
        <div className="details-content-col">
          {/* Countdown Card (if future event) */}
          <div className="details-countdown-card">
            <div className="countdown-card-left">
              <Sparkles size={18} className="text-pink" />
              <div>
                <h4 className="font-semibold text-slate-800">Event Commences In:</h4>
                <p className="text-xs text-slate-500">Live countdown to opening keynote doors</p>
              </div>
            </div>
            <CountdownTimer targetDate={`${event.date}T09:00:00`} />
          </div>

          {/* Event Overview Section */}
          <section className="details-section">
            <h2 className="details-section-heading">About This Conference</h2>
            <div className="details-body-prose">
              <p>{event.description}</p>
            </div>
          </section>

          {/* Event Highlights Section */}
          {event.highlights && event.highlights.length > 0 && (
            <section className="details-section">
              <h2 className="details-section-heading">Key Takeaways & Highlights</h2>
              <ul className="details-highlights-list">
                {event.highlights.map((item, idx) => (
                  <li key={idx} className="highlight-item">
                    <CheckCircle2 size={18} className="text-pink shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Detailed Agenda / Schedule */}
          {event.agenda && event.agenda.length > 0 && (
            <section className="details-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="details-section-heading mb-0">Official Schedule & Tracks</h2>
                <span className="text-xs text-slate-500 font-medium">All times local to venue</span>
              </div>
              <div className="agenda-timeline">
                {event.agenda.map((slot, index) => (
                  <div key={index} className="agenda-timeline-item">
                    <div className="agenda-time-pill">{slot.time}</div>
                    <div className="agenda-content-card">
                      <h4 className="agenda-item-title">{slot.title}</h4>
                      <p className="agenda-item-speaker">
                        <Users size={13} className="inline mr-1 text-pink" />
                        {slot.speaker}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Keynote Speakers Section */}
          {eventSpeakers.length > 0 && (
            <section className="details-section">
              <h2 className="details-section-heading">Featured Keynote Speakers</h2>
              <div className="details-speakers-grid">
                {eventSpeakers.map(sp => (
                  <SpeakerCard key={sp.id} speaker={sp} />
                ))}
              </div>
            </section>
          )}

          {/* Venue & Location Details Card */}
          <section className="details-section">
            <h2 className="details-section-heading">Venue & Location</h2>
            <div className="venue-details-card">
              <div className="venue-info-box">
                <MapPin size={22} className="text-pink shrink-0" />
                <div>
                  <h4 className="venue-name">{event.venue}</h4>
                  <p className="venue-address">{event.location}</p>
                  <p className="venue-subtext">
                    Transit accessible. Dedicated Stackly Attendee registration check-in at main lobby.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar: Registration Box */}
        <aside className="details-sidebar-col">
          <div className="sticky-ticket-card">
            {/* Price Header */}
            <div className="ticket-card-price-row">
              <div>
                <span className="ticket-price-label">Ticket Admission</span>
                <div className="ticket-price-value">{event.price}</div>
              </div>
              <div className="ticket-actions-row">
                <button
                  type="button"
                  onClick={() => toggleFavourite(event.id)}
                  className={`btn-icon-circle ${saved ? 'active' : ''}`}
                  title={saved ? 'Remove Favourite' : 'Add Favourite'}
                >
                  <Heart size={18} className={saved ? 'fill-pink text-pink' : 'text-slate-600'} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-icon-circle"
                  title="Share Event"
                >
                  <Share2 size={18} className="text-slate-600" />
                </button>
              </div>
            </div>

            {/* Seat Availability Bar */}
            <div className="ticket-seats-box">
              <div className="seats-info-row">
                <span className={`seats-badge ${isUrgent ? 'seats-urgent' : ''}`}>
                  <Users size={13} className="inline mr-1" />
                  {event.availableSeats} seats left
                </span>
                <span className="seats-pct">{seatsReservedPct}% reserved</span>
              </div>
              <div className="seats-track">
                <div 
                  className={`seats-fill ${isUrgent ? 'urgent' : ''}`} 
                  style={{ width: `${seatsReservedPct}%` }}
                />
              </div>
              <p className="seats-caption">
                {isUrgent 
                  ? "High booking volume: Less than 20 seats remaining." 
                  : "Registration closes 24 hours prior to keynote."}
              </p>
            </div>

            {/* CTA Button */}
            {!registered ? (
              <div className="ticket-cta-wrapper">
                <button
                  onClick={() => openRegistrationModal(event)}
                  className="btn-primary w-full py-4 text-base"
                >
                  <Ticket size={18} />
                  <span>Register Now</span>
                </button>
                <Link
                  to={`/register/${event.id}`}
                  className="btn-secondary w-full text-center text-sm py-2.5"
                >
                  Full Page Registration Form
                </Link>
              </div>
            ) : (
              <div className="ticket-already-registered-card">
                <CheckCircle2 size={24} className="text-emerald-500" />
                <div>
                  <h5 className="font-semibold text-slate-800">You Are Registered!</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Your official pass is generated and ready.</p>
                </div>
                <Link to="/my-registrations" className="btn-primary text-xs w-full py-2">
                  View Pass in My Registrations
                </Link>
              </div>
            )}

            {/* Pass Inclusions Checklist */}
            <div className="ticket-inclusions">
              <h5 className="inclusions-title">Your Pass Includes:</h5>
              <ul className="inclusions-list">
                <li>
                  <CheckCircle2 size={15} className="text-pink shrink-0" />
                  <span>Full in-person / virtual session access</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-pink shrink-0" />
                  <span>Official verifiable digital certificate of attendance</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-pink shrink-0" />
                  <span>Session recordings and slide decks repository</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-pink shrink-0" />
                  <span>VIP networking cocktail & roundtable admittance</span>
                </li>
              </ul>
            </div>

            {/* Guarantee / Security badge */}
            <div className="ticket-guarantee">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>Free cancellation up to 48 hours before summit.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;
