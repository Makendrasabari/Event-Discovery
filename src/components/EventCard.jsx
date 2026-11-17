import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  ArrowRight, 
  Users, 
  CheckCircle2,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const EventCard = ({ event, featured = false, className = '', style = {} }) => {
  const { toggleFavourite, isFavourite, isRegistered, openRegistrationModal } = useApp();

  const saved = isFavourite(event.id);
  const registered = isRegistered(event.id);

  // Calculate seat urgency percentage
  const seatsPct = Math.round(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100);
  const isUrgent = event.availableSeats <= 20;

  return (
    <article className={`event-card ${featured ? 'card-featured' : ''} ${className}`} style={style}>
      {/* Media Header */}
      <div className="card-media-wrapper">
        <Link to={`/events/${event.id}`} className="card-media-link" tabIndex={-1}>
          <img
            src={event.image}
            alt={event.title}
            className="card-img"
            loading="lazy"
          />
        </Link>

        {/* Category Badge */}
        <span className={`card-category-badge badge-${event.category.toLowerCase()}`}>
          {event.category}
        </span>

        {/* Price/Free Badge */}
        <span className={`card-price-badge ${event.price === 'Free' ? 'badge-free' : ''}`}>
          {event.price}
        </span>

        {/* Favourite Heart Action */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavourite(event.id);
          }}
          className={`card-favourite-btn ${saved ? 'active' : ''}`}
          aria-label={saved ? 'Remove from favourites' : 'Save to favourites'}
          title={saved ? 'Remove favourite' : 'Save favourite'}
        >
          <Heart size={18} className={saved ? 'fill-pink text-pink' : 'text-slate-600'} />
        </button>

        {/* Registered status flag */}
        {registered && (
          <div className="card-registered-pill">
            <CheckCircle2 size={13} />
            <span>Pass Booked</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-content">
        {/* Meta Row: Date & Time */}
        <div className="card-meta-row">
          <div className="meta-item">
            <Calendar size={14} className="text-pink shrink-0" />
            <span>{event.formattedDate}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} className="text-slate-400 shrink-0" />
            <span>{event.time.split('–')[0]}</span>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="card-title">
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </h3>

        {/* Location Row */}
        <div className="card-location">
          <MapPin size={14} className="text-pink shrink-0" />
          <span>{event.location}</span>
        </div>

        {/* Short Description */}
        <p className="card-desc">
          {event.shortDescription}
        </p>

        {/* Available Seats Bar */}
        <div className="card-seats-wrapper">
          <div className="seats-info">
            <span className={`seats-count ${isUrgent ? 'seats-urgent' : ''}`}>
              <Users size={13} className="inline mr-1" />
              {event.availableSeats} seats remaining
            </span>
            <span className="seats-total">{seatsPct}% reserved</span>
          </div>
          <div className="seats-track">
            <div 
              className={`seats-fill ${isUrgent ? 'urgent' : ''}`} 
              style={{ width: `${seatsPct}%` }}
            />
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="card-actions-row">
          <Link 
            to={`/events/${event.id}`} 
            className="btn-card-details"
          >
            <span>View Details</span>
            <ArrowRight size={15} />
          </Link>

          {!registered ? (
            <button
              type="button"
              onClick={() => openRegistrationModal(event)}
              className="btn-card-register"
              title="Quick Register"
            >
              <Ticket size={15} />
              <span>Book</span>
            </button>
          ) : (
            <Link 
              to="/my-registrations" 
              className="btn-card-registered-link"
              title="View your registration pass"
            >
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Pass Ready</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
