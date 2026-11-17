import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EVENTS } from '../data/eventsData';

const AppContext = createContext();

const STORAGE_KEYS = {
  REGISTRATIONS: 'stackly_registrations_v1',
  FAVOURITES: 'stackly_favourites_v1',
  USER: 'stackly_user_v1'
};

// Seed 1 initial registration if none exists, so user can immediately test My Registrations
const INITIAL_REGISTRATIONS = [
  {
    registrationId: "STK-REG-849102",
    eventId: "event-ai-summit-2026",
    eventTitle: "Global AI & Quantum Computing Summit 2026",
    eventDate: "December 14, 2026",
    eventTime: "09:00 AM – 05:30 PM EST",
    eventLocation: "San Francisco, CA",
    venue: "Moscone Center – West Hall, 747 Howard St",
    eventImage: "/assets/events/event_ai_summit.webp",
    category: "Technology",
    ticketCode: "STK-VIP-9941",
    attendeeName: "Alex Johnson",
    attendeeEmail: "alex.johnson@example.com",
    attendeePhone: "+1 (555) 234-5678",
    registeredAt: "2026-11-10T14:22:00Z"
  }
];

export const AppProvider = ({ children }) => {
  // Registrations state
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
      return INITIAL_REGISTRATIONS;
    } catch (e) {
      console.error("Error reading registrations from localStorage", e);
      return INITIAL_REGISTRATIONS;
    }
  });

  // Favourites state
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVOURITES);
      return saved ? JSON.parse(saved) : ["event-ai-summit-2026", "event-ux-design-craft"];
    } catch (e) {
      return ["event-ai-summit-2026"];
    }
  });

  // User state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 234-5678",
        company: "VentureCraft Labs",
        role: "Senior Engineering Manager"
      };
    } catch (e) {
      return null;
    }
  });

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [regModalData, setRegModalData] = useState({ isOpen: false, event: null });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Persist registrations
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error("Error saving registrations to localStorage", e);
    }
  }, [registrations]);

  // Persist favourites
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favourites));
    } catch (e) {
      console.error("Error saving favourites to localStorage", e);
    }
  }, [favourites]);

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error("Error saving user to localStorage", e);
    }
  }, [user]);

  // Toast helper
  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Favourite
  const toggleFavourite = (eventId) => {
    const event = EVENTS.find(e => e.id === eventId);
    const title = event ? event.title : "Event";
    if (favourites.includes(eventId)) {
      setFavourites(prev => prev.filter(id => id !== eventId));
      addToast('info', 'Removed from Favourites', `"${title}" was removed from your saved list.`);
    } else {
      setFavourites(prev => [...prev, eventId]);
      addToast('success', 'Added to Favourites', `"${title}" has been saved to your favourite events.`);
    }
  };

  const isFavourite = (eventId) => favourites.includes(eventId);

  // Register for event
  const registerForEvent = (eventId, formData) => {
    const event = EVENTS.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: "Event not found" };
    }

    // Check duplicate
    const isAlreadyRegistered = registrations.some(r => r.eventId === eventId);
    if (isAlreadyRegistered) {
      addToast('warning', 'Already Registered', `You have already registered for "${event.title}". Check "My Registrations".`);
      return { success: false, message: "You are already registered for this event." };
    }

    const newReg = {
      registrationId: `STK-REG-${Math.floor(100000 + Math.random() * 900000)}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.formattedDate,
      eventTime: event.time,
      eventLocation: event.location,
      venue: event.venue,
      eventImage: event.image,
      category: event.category,
      ticketCode: `STK-PASS-${Math.floor(1000 + Math.random() * 9000)}`,
      attendeeName: formData.fullName.trim(),
      attendeeEmail: formData.email.trim(),
      attendeePhone: formData.phone.trim(),
      registeredAt: new Date().toISOString()
    };

    setRegistrations(prev => [newReg, ...prev]);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF00D5', '#E11D48', '#FF66B2', '#FFFFFF']
      });
    } catch (e) {
      // Confetti fallback
    }

    addToast('success', 'Registration Confirmed!', `You are officially registered for "${event.title}". Pass generated.`);
    return { success: true, registration: newReg };
  };

  // Cancel registration
  const cancelRegistration = (registrationId) => {
    const reg = registrations.find(r => r.registrationId === registrationId);
    setRegistrations(prev => prev.filter(r => r.registrationId !== registrationId));
    if (reg) {
      addToast('info', 'Registration Cancelled', `Your ticket for "${reg.eventTitle}" has been cancelled.`);
    }
  };

  const isRegistered = (eventId) => registrations.some(r => r.eventId === eventId);

  const openRegistrationModal = (event) => {
    setRegModalData({ isOpen: true, event });
  };

  const closeRegistrationModal = () => {
    setRegModalData({ isOpen: false, event: null });
  };

  return (
    <AppContext.Provider
      value={{
        registrations,
        favourites,
        user,
        setUser,
        authModalOpen,
        setAuthModalOpen,
        regModalData,
        openRegistrationModal,
        closeRegistrationModal,
        toasts,
        addToast,
        removeToast,
        toggleFavourite,
        isFavourite,
        registerForEvent,
        cancelRegistration,
        isRegistered
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
