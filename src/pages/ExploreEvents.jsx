import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ArrowUpDown, 
  X, 
  Compass, 
  SlidersHorizontal, 
  Sparkles,
  Heart,
  RotateCcw
} from 'lucide-react';
import { EVENTS, CATEGORIES } from '../data/eventsData';
import EventCard from '../components/EventCard';
import { useApp } from '../context/AppContext';

const ExploreEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favourites } = useApp();

  // URL state synchronization
  const initialCategory = searchParams.get('category') || 'All';
  const initialLocation = searchParams.get('location') || 'All';
  const initialFilter = searchParams.get('filter') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [sortBy, setSortBy] = useState('date-asc'); // date-asc, date-desc, seats-asc, seats-desc, title-asc
  const [showOnlySaved, setShowOnlySaved] = useState(initialFilter === 'saved');

  // Synchronize if query params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const loc = searchParams.get('location');
    if (loc) setSelectedLocation(loc);
    const flt = searchParams.get('filter');
    if (flt === 'saved') setShowOnlySaved(true);
  }, [searchParams]);

  // Extract distinct locations
  const availableLocations = useMemo(() => {
    const locs = new Set();
    EVENTS.forEach(e => {
      if (e.location.includes('San Francisco')) locs.add('San Francisco, CA');
      else if (e.location.includes('New York')) locs.add('New York, NY');
      else if (e.location.includes('London')) locs.add('London, UK');
      else if (e.location.includes('Tokyo')) locs.add('Tokyo, Japan');
      else if (e.location.includes('Berlin')) locs.add('Berlin, Germany');
      else if (e.location.includes('Online')) locs.add('Online / Virtual');
      else locs.add(e.location);
    });
    return Array.from(locs);
  }, []);

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    return EVENTS.filter(event => {
      // 1. Search term (by event name or tag or short description)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(term);
        const matchesDesc = event.shortDescription.toLowerCase().includes(term);
        const matchesTags = event.tags?.some(t => t.toLowerCase().includes(term));
        if (!matchesTitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Location filter
      if (selectedLocation !== 'All') {
        if (!event.location.toLowerCase().includes(selectedLocation.split(',')[0].toLowerCase())) {
          return false;
        }
      }

      // 4. Saved filter
      if (showOnlySaved && !favourites.includes(event.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'seats-urgent') {
        return a.availableSeats - b.availableSeats;
      }
      if (sortBy === 'seats-available') {
        return b.availableSeats - a.availableSeats;
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedLocation, sortBy, showOnlySaved, favourites]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSortBy('date-asc');
    setShowOnlySaved(false);
    setSearchParams({});
  };

  return (
    <div className="explore-page">
      {/* Page Header */}
      <section className="explore-header-section">
        <div className="container">
          <div className="explore-header-badge">
            <Compass size={14} className="text-pink" />
            <span>Curated Global Schedule</span>
          </div>
          <h1 className="explore-header-title">Explore Conferences & Masterclasses</h1>
          <p className="explore-header-subtitle">
            Discover {EVENTS.length} hand-picked summits, deep-dive workshops, and executive forums. Filter by discipline, location, or search directly.
          </p>

          {/* Search Box Bar */}
          <div className="explore-search-bar-wrap">
            <div className="search-input-box">
              <Search size={20} className="search-box-icon text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search summits by name, topic (e.g. AI, Figma, DevOps, Fintech)..."
                className="search-box-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="search-box-clear"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Controls Toolbar */}
      <section className="explore-toolbar-section">
        <div className="container">
          <div className="explore-toolbar-inner">
            {/* Category Filter Tabs */}
            <div className="category-tabs-scroll">
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={`category-tab-btn ${selectedCategory === 'All' ? 'active' : ''}`}
              >
                All Categories ({EVENTS.length})
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`category-tab-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Favourites Quick Toggle */}
            <button
              type="button"
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              className={`saved-toggle-btn ${showOnlySaved ? 'active' : ''}`}
            >
              <Heart size={16} className={showOnlySaved ? 'fill-pink text-pink' : ''} />
              <span>Saved Favourites ({favourites.length})</span>
            </button>
          </div>

          {/* Secondary Controls: Location + Sorting + Reset */}
          <div className="explore-secondary-controls">
            {/* Location Select */}
            <div className="control-group">
              <label htmlFor="location-select" className="control-label">
                <MapPin size={14} className="text-pink inline mr-1" />
                <span>Location:</span>
              </label>
              <select
                id="location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="control-select"
              >
                <option value="All">All Locations ({availableLocations.length} Cities)</option>
                {availableLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Sorting Select */}
            <div className="control-group">
              <label htmlFor="sort-select" className="control-label">
                <ArrowUpDown size={14} className="text-pink inline mr-1" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="control-select"
              >
                <option value="date-asc">Date: Upcoming (Earliest First)</option>
                <option value="date-desc">Date: Furthest First</option>
                <option value="seats-urgent">Seats: Fewest Remaining (Urgent)</option>
                <option value="seats-available">Seats: Most Available</option>
                <option value="title-asc">Alphabetical: Event Name (A-Z)</option>
              </select>
            </div>

            {/* Results count & Clear */}
            <div className="control-meta-right">
              <span className="results-count-text">
                Showing <strong>{filteredEvents.length}</strong> of {EVENTS.length} events
              </span>
              {(searchTerm || selectedCategory !== 'All' || selectedLocation !== 'All' || showOnlySaved) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn-reset-filters"
                  title="Reset all filters"
                >
                  <RotateCcw size={13} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="explore-grid-section py-12">
        <div className="container">
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="explore-empty-state">
              <div className="empty-state-icon-box">
                <Compass size={40} className="text-pink" />
              </div>
              <h3 className="empty-state-title">No matching events found</h3>
              <p className="empty-state-desc">
                We couldn't find any summits matching your filter criteria. Try clearing your keywords or selecting a broader location.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-primary mt-4"
              >
                <RotateCcw size={16} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExploreEvents;
