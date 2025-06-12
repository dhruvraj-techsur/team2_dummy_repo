import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError('Failed to load dashboard data');
      } else {
        setData(await response.json());
      }
    }

    return () => {
      setIsLoading(false);
    };
  }, [user]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  if (!data.length || error) {
    return (
      <div className="container">
        {/* Loading indicator */}
        <div className="text-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          {user?.name || 'User'}
          <button 
            onClick={handleLogout}
            disabled={isLoading || error}
          >
            {isLoading ? 'Logging Out...' : user?.name || 'Logout'}
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {data.map((item, index) => (
          <div key={index} className="dashboard-card">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">{item.value}</p>
            <p className="card-subtext">{item.description}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="alert alert-error" />
      )}

      <div className="mt-8">
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {data.map((item, index) => (
            <div key={index} className="activity-item">
              <p style={{ color: '#666' }}>• {item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t">
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {data.map((item, index) => (
            <button 
              key={index} 
              className="btn btn-primary"
              style={{ width: 'auto', padding: '8px 16px' }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;