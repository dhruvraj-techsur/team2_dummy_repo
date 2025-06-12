import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import fetch from 'fetch';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(false);
          if (loadingError) {
            setLoadingError(true);
          }
        }, 2000);
      }
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setLoadingError(true);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/dashboard', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setLoadingError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const DashboardSection = () => {
    const { data, error } = await fetchDashboardData();
    
    if (error) {
      return <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#e60049', fontSize: '1.5rem' }}>Error fetching dashboard data</h3>
        <p style={{ color: '#e60049', marginTop: '0.5rem' }}>The dashboard is currently unavailable.</p>
      </div>;
    }

    return (
      <>
        <div className="dashboard-header">
          <div className="header-title">{user?.name || 'User'}</div>
          <div className="header-description">Welcome to your personalized dashboard</div>
        </div>

        <div className="dashboard-content">
          {data.map((item, index) => (
            <div key={index} className="dashboard-card">
              <h3>{item.title}</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', margin: '1rem 0' }}>
                {item.value}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="recent-activity">
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data?.map((item, index) => (
              <p key={index} style={{ color: '#666' }}>
                {item.value}
              </p>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              style={{ width: 'auto', padding: '8px 16px' }}
            >
              Create New Project
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ width: 'auto', padding: '8px 16px' }}
            >
              View Reports
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ width: 'auto', padding: '8px 16px' }}
            >
              Manage Team
            </button>
          </div>
        </div>

        {isLoading && (
          <>
            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Loading dashboard...</h3>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <DashboardSection />
      
      {user && (
        <div className="footer">
          <p style={{ color: '#666', marginTop: '0.5rem' }}>© 2024 Your Company. All rights reserved.</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;