import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle loading states
  if (!user?.name) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  // Mock dashboard data
  const dashboardData = [
    {
      title: 'Total Projects',
      value: '12',
      description: 'Active projects in your portfolio'
    },
    {
      title: 'Tasks Completed',
      value: '89',
      description: 'Tasks completed this month'
    },
    {
      title: 'Team Members',
      value: '8',
      description: 'Active team members'
    },
    {
      title: 'Performance Score',
      value: '94%',
      description: 'Your overall performance rating'
    }
  ];

  return (
    <div className="container">
      {/* Header Styles */
      <style jsx>{`
        .dashboard-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #333;
        }
        .dashboard-header button {
          display: inline-block;
          padding: 8px 16px;
          background-color: var(--primary);
          color: white;
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        .dashboard-header button:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main Content */
      <div className="dashboard">
        {/* Header Section */}
        <div className="header-section">
          <h1>Welcome, {user?.name || 'User'}!</h1>
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        {/* Content Sections */}
        <div className="content-section">
          {dashboardData.map((item, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">
                {item.value} {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="activity-section">
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[...dashboardData.map((item) => (
              <p key={item.title} style={{ color: '#666' }}>
                • {item.value} - {item.description}
              </p>
            ))]}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="action-section">
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              <span className="action-icon">+</span>Create New Project
            </button>
            <button className="btn btn-secondary">
              <span className="action-icon">📊</span>View Reports
            </button>
            <button className="btn btn-secondary">
              <span className="action-icon">👥</span>Manage Team
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: '#666' }}>
              © {new Date().getFullYear()} Your Dashboard. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>