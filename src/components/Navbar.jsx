import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      // Check if it's a block number (numeric)
      if (/^\d+$/.test(query)) {
        history.push(`/block/${query}`);
      }
      // Check if it's a transaction hash (starts with 0x and 64 chars)
      else if (/^0x[a-fA-F0-9]{64}$/.test(query)) {
        history.push(`/transaction/${query}`);
      }
      // Check if it's an address (starts with 0x and 40 chars)
      else if (/^0x[a-fA-F0-9]{40}$/.test(query)) {
        // For now, redirect to transaction page, but you might want an address page
        history.push(`/transaction/${query}`);
      }
      else {
        alert('Please enter a valid block number, transaction hash, or address');
      }

      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          <h1>BlockScanner</h1>
          <span className="navbar-subtitle">Ethereum Explorer</span>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by Address / Txn Hash / Block"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>

        <div className="navbar-stats">
          <div className="stat-item">
            <span className="stat-label">Gas</span>
            <span className="stat-value">25 Gwei</span>
          </div>
        </div>
      </div>
    </nav>
  );
}