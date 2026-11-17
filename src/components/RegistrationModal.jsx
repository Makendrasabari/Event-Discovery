import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Ticket, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const RegistrationModal = () => {
  const { regModalData, closeRegistrationModal, registerForEvent, isRegistered, user } = useApp();
  const navigate = useNavigate();

  const event = regModalData.event;
  const isOpen = regModalData.isOpen && !!event;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Pre-populate if user is logged in
  useEffect(() => {
    if (isOpen) {
      setSuccessData(null);
      setErrors({});
      if (user) {
        setFormData({
          fullName: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        });
      } else {
        setFormData({
          fullName: '',
          email: '',
          phone: ''
        });
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    
    // Full Name
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Full Name must be at least 3 characters.';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    // Phone Number (at least 7 digits, allowed +, -, (), spaces)
    const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field on type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerForEvent(event.id, formData);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessData(res.registration);
      } else {
        setErrors(prev => ({ ...prev, general: res.message }));
      }
    }, 400);
  };

  const handleGoToMyRegistrations = () => {
    closeRegistrationModal();
    navigate('/my-registrations');
  };

  const alreadyRegistered = isRegistered(event.id);

  return (
    <div className="modal-backdrop" onClick={closeRegistrationModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={closeRegistrationModal}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {successData ? (
          /* Success Screen */
          <div className="modal-success-content">
            <div className="success-icon-badge">
              <CheckCircle2 size={44} className="text-emerald-500" />
            </div>
            <h3 className="success-modal-title">Registration Confirmed!</h3>
            <p className="success-modal-subtitle">
              Your pass for <strong>{event.title}</strong> has been secured.
            </p>

            <div className="success-ticket-summary">
              <div className="ticket-summary-header">
                <div>
                  <span className="text-xs font-bold text-pink tracking-wider uppercase">Official Pass</span>
                  <div className="text-sm font-semibold text-slate-800">{successData.ticketCode}</div>
                </div>
                <span className="badge-pill bg-pink-100 text-pink">Confirmed</span>
              </div>
              <div className="ticket-summary-details">
                <div><strong>Attendee:</strong> {successData.attendeeName}</div>
                <div><strong>Email:</strong> {successData.attendeeEmail}</div>
                <div><strong>Date:</strong> {successData.eventDate}</div>
                <div><strong>Venue:</strong> {successData.venue}</div>
              </div>
            </div>

            <div className="success-modal-actions">
              <button 
                onClick={handleGoToMyRegistrations} 
                className="btn-primary w-full"
              >
                <span>View in My Registrations</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={closeRegistrationModal} 
                className="btn-secondary w-full"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="modal-form-content">
            <div className="modal-event-header">
              <img 
                src={event.image} 
                alt={event.title} 
                className="modal-event-thumb"
              />
              <div className="modal-event-header-text">
                <span className="badge-pill badge-primary mb-1">{event.category}</span>
                <h3 className="modal-title">{event.title}</h3>
                <div className="modal-event-meta">
                  <span><Calendar size={13} className="inline mr-1 text-pink" />{event.formattedDate}</span>
                  <span><MapPin size={13} className="inline mr-1 text-pink" />{event.location}</span>
                </div>
              </div>
            </div>

            {alreadyRegistered ? (
              <div className="modal-already-registered">
                <AlertCircle size={24} className="text-pink shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-800">You are already registered!</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Your digital pass for this event is saved in your account. You can view or manage it anytime.
                  </p>
                  <button 
                    onClick={handleGoToMyRegistrations}
                    className="btn-primary mt-3 text-sm"
                  >
                    Go to My Registrations
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="registration-form" noValidate>
                <div className="form-legend">
                  <Ticket size={16} className="text-pink" />
                  <span>Enter Attendee Details</span>
                </div>

                {errors.general && (
                  <div className="form-error-banner">
                    <AlertCircle size={16} />
                    <span>{errors.general}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="modal-fullName" className="form-label">
                    Full Name <span className="text-pink">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input
                      id="modal-fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Connor"
                      className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                      required
                    />
                  </div>
                  {errors.fullName && <p className="form-field-error">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="modal-email" className="form-label">
                    Email Address <span className="text-pink">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Mail size={16} className="input-icon" />
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@enterprise.com"
                      className={`form-input ${errors.email ? 'has-error' : ''}`}
                      required
                    />
                  </div>
                  {errors.email && <p className="form-field-error">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="modal-phone" className="form-label">
                    Phone Number <span className="text-pink">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={16} className="input-icon" />
                    <input
                      id="modal-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 019-2834"
                      className={`form-input ${errors.phone ? 'has-error' : ''}`}
                      required
                    />
                  </div>
                  {errors.phone && <p className="form-field-error">{errors.phone}</p>}
                </div>

                <div className="form-footer-terms">
                  <span>By registering, you confirm attendance and agree to Stackly's Attendee Code of Conduct.</span>
                </div>

                <div className="form-submit-row">
                  <button 
                    type="button" 
                    onClick={closeRegistrationModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Reserving Pass...</span>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Confirm Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
