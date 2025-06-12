import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(false);
          if (loadingError) {
            setLoadingError('Failed to log out');
          }
        }, 1500);
      }
      navigate('/login');
    } catch (error) {
      setLoadingError('Failed to log out');
      console.error('Logout error:', error);
    }
  };

  // Mock dashboard data
  const dashboardItems = [
    { id: 1, title: 'New Project', description: 'Just created "E-commerce Platform"', lastUpdated: '2 hours ago' },
    { id: 2, title: 'Team Member', description: 'Added "Sarah Johnson" to team', lastUpdated: '1 day ago' },
    { id: 3, title: 'Task', description: 'Completed "User Authentication"', lastUpdated: '3 days ago' },
    { id: 4, title: 'Report', description: 'Generated monthly report', lastUpdated: '1 week ago' }
  ];

  const fetchDashboardData = async () => {
    try {
      await new Promise((resolve) => 
        setTimeout(() => resolve(dashboardItems), 500)
      );
    } catch (error) {
      setLoadingError('Failed to fetch dashboard data');
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        {isLoading && <div className="loading-indicator">Loading...</div>}
        
        {loadingError && (
          <div className="notification bell">
            <svg xmlns="http://www.w3.org/2000/svg" className=" Bell" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15,17H8a2,2 0 00-2,-2V9m3,3h2.207c-.65.65-1.714.919-2.717 1.414l-.962 3.175C9.832 12.355 8.75 11.225 7.5 10a2.717 2.717 0 00-5.243-5.659c-.914-.914-1.829-1.829-2.717-2.717L5.75,9.72c-.914.914.082.914.916 1.829l.393.392C6.67 13.434 7.75 14.375 8.73 14a2.717 2.717 0 00-5.244 5.659c-.915 .915-.08.915.08 1.829l.394.392C12.67 14.375 13.75 13.434 14.73 14a2.717 2.717 0 005.245 5.658c.915-.915.08-.915-.08-1.829l-.394.392C13.33,12.356 12.25,11.225 10.5,10a2.716 2.716 0 00-5.243 5.658z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="loading-indicator">Loading...</div>
      )}

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {fetchDashboardData() && (
          <div className="dashboard-grid">
            {dashboardItems.map((item) => (
              <div key={item.id} className="dashboard-card">
                <h3>{item.title}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                  {item.description}
                </p>
                <p style={{ margin: '1rem 0', color: '#666' }}>Last updated: {item.lastUpdated}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-actions">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={handleLogout}
            disabled={!user?.isAuthenticated || isLoading || setLoadingError}
          >
            {isLoading ? 'Logging Out...' : user?.isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;