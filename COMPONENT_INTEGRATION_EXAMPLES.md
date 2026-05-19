/**
 * COMPONENT INTEGRATION EXAMPLES
 * 
 * Shows how to use API services in React components
 * Copy these patterns into your own components
 */

// ============================================================
// Example 1: Simple List Component with Pagination
// ============================================================

import { useEffect, useState } from 'react';
import blogService from '../services/blogService.js';

export function BlogListExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await blogService.getAllPosts(page, 9);
        setPosts(response.data.posts || []);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid gap-4">
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
      <button onClick={() => setPage(p => p + 1)}>Next Page</button>
    </div>
  );
}

// ============================================================
// Example 2: Form Submission with File Upload
// ============================================================

import { useRef } from 'react';
import uploadService from '../services/uploadService.js';
import ideasService from '../services/ideasService.js';

export function SubmitIdeaExample() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      let attachmentUrl = null;

      // Upload file if provided
      if (fileInputRef.current?.files[0]) {
        const uploadRes = await uploadService.uploadFile(
          fileInputRef.current.files[0],
          'ideas',
          'document'
        );
        attachmentUrl = uploadRes.data.url;
      }

      // Submit idea
      const ideaData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        attachment_url: attachmentUrl,
      };

      await ideasService.submitIdea(ideaData);
      setSuccess(true);
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {success && <div>Idea submitted successfully!</div>}
      {error && <div>Error: {error}</div>}

      <input
        type="text"
        name="title"
        placeholder="Idea Title"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        required
      />
      <select name="category" required>
        <option>Select Category</option>
        <option>Infrastructure</option>
        <option>Health</option>
        <option>Education</option>
      </select>
      <input ref={fileInputRef} type="file" />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Idea'}
      </button>
    </form>
  );
}

// ============================================================
// Example 3: Data with Filters and Sorting
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import eventsService from '../services/eventsService.js';

export function EventsFilterExample() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    status: 'all',
  });

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await eventsService.getAllEvents(filters.page, 20);
      setEvents(response.data.events || []);
    } catch (err) {
      console.error(err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [filters.page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  return (
    <div>
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange({ status: e.target.value })}
        >
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      {loading ? (
        <div>Loading events...</div>
      ) : (
        <div className="grid">
          {events.map(event => (
            <div key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => handleFilterChange({ page: filters.page + 1 })}
      >
        Load More
      </button>
    </div>
  );
}

// ============================================================
// Example 4: Real-time Vote/Interaction
// ============================================================

import { useState } from 'react';
import ideasService from '../services/ideasService.js';

export function IdeaCardExample({ idea }) {
  const [votes, setVotes] = useState(idea.votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false);

  async function handleVote(voteType) {
    if (hasVoted || voting) return;

    try {
      setVoting(true);
      await ideasService.voteIdea(idea.id, voteType);
      setVotes(votes + (voteType === 'up' ? 1 : -1));
      setHasVoted(true);
    } catch (err) {
      console.error('Vote failed:', err.message);
    } finally {
      setVoting(false);
    }
  }

  return (
    <div className="idea-card">
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <div className="votes">
        <button
          onClick={() => handleVote('up')}
          disabled={hasVoted || voting}
          className="vote-up"
        >
          👍 {votes}
        </button>
        <button
          onClick={() => handleVote('down')}
          disabled={hasVoted || voting}
          className="vote-down"
        >
          👎
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Example 5: Custom Hook for Reusable Data Fetching
// ============================================================

/**
 * Reusable hook for fetching data from any service
 * Usage: const { data, loading, error } = useServiceData(() => blogService.getAllPosts(1, 10));
 */
function useServiceData(serviceFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await serviceFn();
        setData(result);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, dependencies);

  return { data, loading, error };
}

// Usage Example:
export function HeroSlidesExample() {
  import heroSlidesService from '../services/heroSlidesService.js';
  
  const { data, loading, error } = useServiceData(
    () => heroSlidesService.getActiveSlides(),
    [] // dependencies
  );

  if (loading) return <div>Loading slides...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="carousel">
      {data?.data?.slides?.map(slide => (
        <div key={slide.id} className="slide">
          <img src={slide.image} alt={slide.title} />
          <h2>{slide.title}</h2>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Example 6: Admin - Creating Content with FormData
// ============================================================

import heroSlidesService from '../services/heroSlidesService.js';

export function AdminCreateSlideExample() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  async function handleCreateSlide(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target);

      // Append file if provided
      if (fileInputRef.current?.files[0]) {
        formData.append('image', fileInputRef.current.files[0]);
      }

      // Note: heroSlidesService automatically detects FormData
      // and handles content-type correctly
      const response = await heroSlidesService.createSlide(formData);
      
      console.log('Slide created:', response.data);
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateSlide}>
      {error && <div className="error">{error}</div>}

      <input
        type="text"
        name="title"
        placeholder="Slide Title"
        required
      />
      <textarea
        name="subtitle"
        placeholder="Subtitle"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        required
      />
      <input
        type="text"
        name="cta_text"
        placeholder="CTA Button Text"
      />
      <input
        type="url"
        name="cta_link"
        placeholder="CTA Link"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Slide'}
      </button>
    </form>
  );
}

// ============================================================
// Example 7: Authentication - Login and Token Management
// ============================================================

import { useState } from 'react';
import { setAuthToken, getAuthToken } from '../lib/apiClient.js';
import apiClient from '../lib/apiClient.js';

export function LoginExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Login endpoint (adjust to your actual API)
      const response = await apiClient('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        requiresAuth: false, // Login doesn't need existing token
      });

      // Save token to localStorage
      setAuthToken(response.data.token);
      console.log('Login successful!');

      // Optional: Redirect to dashboard
      // window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuthToken(null); // Clear token
    console.log('Logged out');
    // Optional: Redirect to home
    // window.location.href = '/';
  }

  const currentToken = getAuthToken();

  return (
    <div>
      {currentToken ? (
        <div>
          <p>You are logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          {error && <div className="error">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
    </div>
  );
}

// ============================================================
// Export all examples (optional, for demo purposes)
// ============================================================

export default {
  BlogListExample,
  SubmitIdeaExample,
  EventsFilterExample,
  IdeaCardExample,
  useServiceData,
  HeroSlidesExample,
  AdminCreateSlideExample,
  LoginExample,
};
