import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name || 'User'}!</h1>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>
              Here's your personalized dashboard overview
            </p>
          </div>
          <button 
            className="logout-btn"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        <div className="dashboard-content">
          {dashboardData.map((item, index) => (
            <div key={index} className="dashboard-card">
              <h3>{item.title}</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', margin: '1rem 0' }}>
                {item.value}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ color: '#666' }}>• Project "E-commerce Platform" updated - 2 hours ago</p>
            <p style={{ color: '#666' }}>• New team member "Sarah Johnson" joined - 1 day ago</p>
            <p style={{ color: '#666' }}>• Task "User Authentication" completed - 3 days ago</p>
            <p style={{ color: '#666' }}>• Monthly report generated - 1 week ago</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e8f4fd', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px' }}>
              Create New Project
            </button>
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px' }}>
              View Reports
            </button>
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px' }}>
              Manage Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 