import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Trash2, 
  ArrowRight, 
  QrCode, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Compass,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const MyRegistrations = () => {
  const { registrations, cancelRegistration } = useApp();
  const [cancellingId, setCancellingId] = useState(null);

  const confirmCancel = (registrationId) => {
    cancelRegistration(registrationId);
    setCancellingId(null);
  };

  const handlePrint = (eventTitle) => {
    window.print();
  };

  return (
    <div className="my-registrations-page">
      {/* Header Banner */}
      <section className="registrations-header-section">
        <div className="container">
          <div className="registrations-badge">
            <Ticket size={14} className="text-pink" />
            <span>Attendee Portal</span>
          </div>
          <h1 className="registrations-title">My Registered Passes</h1>
          <p className="registrations-subtitle">
            Manage your conference badges, view venue admission codes, or release your seat if your schedule changes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        {registrations.length > 0 ? (
          <div className="registrations-list-wrapper">
            <div className="registrations-count-bar">
              <span className="count-label">
                Active Passes (<strong>{registrations.length}</strong>)
              </span>
              <span className="count-note">
                Passes are stored locally on your device and verified at venue check-in.
              </span>
            </div>

            <div className="registrations-grid">
              {registrations.map(reg => (
                <div key={reg.registrationId} className="ticket-pass-card">
                  {/* Left Pass Body */}
                  <div className="pass-body">
                    {/* Event Header */}
                    <div className="pass-event-row">
                      <img 
                        src={reg.eventImage} 
                        alt={reg.eventTitle} 
                        className="pass-thumb" 
                      />
                      <div className="pass-title-group">
                        <span className={`pass-cat-badge badge-${(reg.category || 'tech').toLowerCase()}`}>
                          {reg.category}
                        </span>
                        <h3 className="pass-event-title">
                          <Link to={`/events/${reg.eventId}`}>{reg.eventTitle}</Link>
                        </h3>
                        <div className="pass-venue-meta">
                          <span><MapPin size={13} className="inline mr-1 text-pink" />{reg.venue || reg.eventLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date / Time Grid */}
                    <div className="pass-meta-grid">
                      <div className="pass-meta-box">
                        <span className="pass-label">Date</span>
                        <div className="pass-val">
                          <Calendar size={14} className="inline mr-1 text-pink" />
                          {reg.eventDate}
                        </div>
                      </div>
                      <div className="pass-meta-box">
                        <span className="pass-label">Time</span>
                        <div className="pass-val">
                          <Clock size={14} className="inline mr-1 text-pink" />
                          {reg.eventTime || '09:00 AM – 05:00 PM'}
                        </div>
                      </div>
                      <div className="pass-meta-box">
                        <span className="pass-label">Attendee</span>
                        <div className="pass-val font-semibold">
                          <User size={14} className="inline mr-1 text-pink" />
                          {reg.attendeeName}
                        </div>
                      </div>
                      <div className="pass-meta-box">
                        <span className="pass-label">Email Confirmation</span>
                        <div className="pass-val text-xs text-slate-600 truncate">
                          {reg.attendeeEmail}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pass-footer-actions">
                      <Link 
                        to={`/events/${reg.eventId}`} 
                        className="btn-pass-view"
                      >
                        <span>View Schedule</span>
                        <ExternalLink size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handlePrint(reg.eventTitle)}
                        className="btn-pass-print"
                        title="Print this pass"
                      >
                        <Printer size={14} />
                        <span>Print Pass</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCancellingId(reg.registrationId)}
                        className="btn-pass-cancel"
                        title="Cancel registration"
                      >
                        <Trash2 size={14} />
                        <span>Cancel Pass</span>
                      </button>
                    </div>
                  </div>

                  {/* Perforated Stub / QR Code Section */}
                  <div className="pass-stub">
                    <div className="stub-notch notch-top" />
                    <div className="stub-notch notch-bottom" />
                    
                    <div className="stub-content">
                      <div className="stub-badge">ADMIT ONE</div>
                      
                      {/* Simulated QR Code */}
                      <div className="stub-qr-box">
                        <QrCode size={80} className="text-slate-800" />
                        <span className="stub-qr-label">SCAN AT DESK</span>
                      </div>

                      <div className="stub-codes">
                        <div className="stub-ticket-code">{reg.ticketCode}</div>
                        <div className="stub-reg-id">{reg.registrationId}</div>
                      </div>

                      <div className="stub-verified-pill">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>Verified Pass</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="registrations-empty-card">
            <div className="empty-icon-bubble">
              <Ticket size={48} className="text-pink" />
            </div>
            <h2 className="empty-title">No Registered Passes Yet</h2>
            <p className="empty-description">
              You haven't reserved a seat for any upcoming conferences or workshops. Browse our catalog of flagship summits to reserve your pass with zero payment required.
            </p>
            <div className="empty-actions">
              <Link to="/explore" className="btn-primary">
                <Compass size={17} />
                <span>Explore Events & Masterclasses</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Dialog */}
      {cancellingId && (
        <div className="modal-backdrop" onClick={() => setCancellingId(null)}>
          <div className="modal-dialog cancel-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-icon-bubble">
              <AlertTriangle size={32} className="text-pink" />
            </div>
            <h3 className="cancel-dialog-title">Cancel Pass Reservation?</h3>
            <p className="cancel-dialog-desc">
              Are you sure you want to release your seat? This action will immediately remove your pass and return the seat to general allocation.
            </p>

            <div className="cancel-dialog-actions">
              <button
                type="button"
                onClick={() => setCancellingId(null)}
                className="btn-secondary w-full"
              >
                Keep My Pass
              </button>
              <button
                type="button"
                onClick={() => confirmCancel(cancellingId)}
                className="btn-danger w-full"
              >
                Yes, Release My Seat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
