import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Ticket, 
  ShieldCheck,
  Building,
  Briefcase
} from 'lucide-react';
import { EVENTS } from '../data/eventsData';
import { useApp } from '../context/AppContext';

const RegistrationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { registerForEvent, isRegistered, user } = useApp();

  const event = EVENTS.find(e => e.id === id) || EVENTS[0];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(null);

  // Initialize with user profile if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        jobTitle: user.role || ''
      }));
    }
  }, [user]);

  const validate = () => {
    const errs = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Full Name must be at least 3 characters.';
    }

    // 2. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@company.com).';
    }

    // 3. Phone Number
    const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
      errs.phone = 'Please enter a valid phone number with area code.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const result = registerForEvent(event.id, formData);
      setIsSubmitting(false);

      if (result.success) {
        setSuccessRegistration(result.registration);
      } else {
        setErrors(prev => ({ ...prev, general: result.message }));
      }
    }, 450);
  };

  const alreadyRegistered = isRegistered(event.id);

  return (
    <div className="registration-page">
      {/* Breadcrumb Bar */}
      <div className="registration-top-bar">
        <div className="container">
          <Link to={`/events/${event.id}`} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-pink transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Event Details</span>
          </Link>
        </div>
      </div>

      <div className="container py-12">
        <div className="registration-layout-grid">
          {/* Left Column: Form / Success Card */}
          <div className="registration-main-card">
            {successRegistration ? (
              <div className="registration-success-box">
                <div className="success-badge-circle">
                  <CheckCircle2 size={56} className="text-emerald-500" />
                </div>
                <h2 className="success-title">Registration Confirmed!</h2>
                <p className="success-subtitle">
                  Congratulations, <strong>{successRegistration.attendeeName}</strong>! Your seat has been secured for <strong>{event.title}</strong>.
                </p>

                <div className="confirmed-pass-card">
                  <div className="pass-card-top">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-pink font-bold">Pass Code</span>
                      <div className="font-mono text-lg font-bold text-slate-900">{successRegistration.ticketCode}</div>
                    </div>
                    <span className="badge-pill bg-emerald-100 text-emerald-700">Official Pass</span>
                  </div>
                  <div className="pass-card-details">
                    <div><strong>Date:</strong> {successRegistration.eventDate}</div>
                    <div><strong>Time:</strong> {successRegistration.eventTime}</div>
                    <div><strong>Venue:</strong> {successRegistration.venue}</div>
                    <div><strong>Registered Email:</strong> {successRegistration.attendeeEmail}</div>
                  </div>
                </div>

                <div className="success-btn-group">
                  <button 
                    onClick={() => navigate('/my-registrations')} 
                    className="btn-primary"
                  >
                    <Ticket size={17} />
                    <span>View in My Registrations</span>
                  </button>
                  <Link to="/explore" className="btn-secondary">
                    Browse Other Events
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="form-header-intro">
                  <div className="section-tag-pill">
                    <Sparkles size={14} className="text-pink" />
                    <span>Instant Pass Reservation</span>
                  </div>
                  <h1 className="registration-heading">Register for {event.title}</h1>
                  <p className="registration-subheading">
                    Please provide accurate attendee details to generate your digital conference pass and admission credentials.
                  </p>
                </div>

                {alreadyRegistered ? (
                  <div className="already-registered-alert">
                    <AlertCircle size={26} className="text-pink shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">You are already registered!</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        A confirmed ticket for this conference is already active in your account. Duplicate registrations are prohibited to keep seats available for other participants.
                      </p>
                      <button 
                        onClick={() => navigate('/my-registrations')}
                        className="btn-primary mt-4"
                      >
                        <Ticket size={16} />
                        <span>Go to My Registrations</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="reg-form" noValidate>
                    {errors.general && (
                      <div className="form-error-banner">
                        <AlertCircle size={18} />
                        <span>{errors.general}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span className="text-pink">*</span>
                      </label>
                      <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Jennifer Walsh"
                          className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                          required
                        />
                      </div>
                      {errors.fullName && <p className="form-field-error">{errors.fullName}</p>}
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="text-pink">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Mail size={18} className="input-icon" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. jennifer.walsh@company.com"
                          className={`form-input ${errors.email ? 'has-error' : ''}`}
                          required
                        />
                      </div>
                      {errors.email && <p className="form-field-error">{errors.email}</p>}
                      <span className="form-help-text">Your badge confirmation and schedule updates will be sent here.</span>
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="text-pink">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Phone size={18} className="input-icon" />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +1 (555) 345-6789"
                          className={`form-input ${errors.phone ? 'has-error' : ''}`}
                          required
                        />
                      </div>
                      {errors.phone && <p className="form-field-error">{errors.phone}</p>}
                    </div>

                    {/* Company (Optional) */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="company" className="form-label">
                          Company / Organization <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="input-with-icon">
                          <Building size={18} className="input-icon" />
                          <input
                            id="company"
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Stripe, MIT, Studio Pulse"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="jobTitle" className="form-label">
                          Job Title <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="input-with-icon">
                          <Briefcase size={18} className="input-icon" />
                          <input
                            id="jobTitle"
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g. Lead Product Designer"
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Attendee Agreement */}
                    <div className="terms-checkbox-box">
                      <ShieldCheck size={18} className="text-pink shrink-0" />
                      <span className="text-xs text-slate-600">
                        By completing this pass reservation, you agree to Stackly's Privacy Policy, Code of Conduct, and local venue health & security regulations.
                      </span>
                    </div>

                    <div className="form-submit-actions">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary w-full py-4 text-base"
                      >
                        {isSubmitting ? (
                          <span>Generating Digital Pass...</span>
                        ) : (
                          <>
                            <Ticket size={18} />
                            <span>Confirm & Reserve My Free Pass</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Event Order Summary Card */}
          <div className="registration-sidebar">
            <div className="event-summary-sticky-card">
              <h3 className="summary-card-title">Event Summary</h3>

              <div className="summary-media-row">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="summary-thumb" 
                />
                <div>
                  <span className={`badge-pill badge-${event.category.toLowerCase()} mb-1`}>
                    {event.category}
                  </span>
                  <h4 className="summary-event-title">{event.title}</h4>
                </div>
              </div>

              <div className="summary-meta-list">
                <div className="summary-meta-item">
                  <Calendar size={16} className="text-pink shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Date</span>
                    <strong className="text-slate-800 text-sm">{event.formattedDate}</strong>
                  </div>
                </div>

                <div className="summary-meta-item">
                  <MapPin size={16} className="text-pink shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Location</span>
                    <strong className="text-slate-800 text-sm">{event.venue}</strong>
                    <span className="text-xs text-slate-500 block">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="summary-pricing-row">
                <span>Admission Fee</span>
                <span className="text-pink font-bold">{event.price}</span>
              </div>

              <div className="summary-perks">
                <h5 className="perks-title">Registration Perks</h5>
                <ul className="perks-list">
                  <li><CheckCircle2 size={14} className="text-pink" /> 100% Free digital admission</li>
                  <li><CheckCircle2 size={14} className="text-pink" /> Verifiable certificate of attendance</li>
                  <li><CheckCircle2 size={14} className="text-pink" /> Access to keynote video recordings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
