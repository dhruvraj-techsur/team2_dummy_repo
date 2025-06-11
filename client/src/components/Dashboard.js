import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import dashboardData from '../data/dashboardData.json';
import recentActivityData from '../data/recentActivityData.json';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(dashboardData);
    setIsLoading(false);
  }, []);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name || 'User'}!</h1>
            <p className="dashboard-header-description">
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
          {data.map((item, index) => (
            <div key={index} className="dashboard-card">
              <h3>{item.title}</h3>
              <p className="dashboard-card-value">
                {item.value}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="recent-activity">
          <h3 className="recent-activity-title">Recent Activity</h3>
          <div className="recent-activity-list">
            {recentActivityData.map((item, index) => (
              <p key={index} className="recent-activity-item">{item.activity}</p>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3 className="quick-actions-title">Quick Actions</h3>
          <div className="quick-actions-buttons">
            <button className="btn btn-primary">
              Create New Project
            </button>
            <button className="btn btn-secondary">
              View Reports
            </button>
            <button className="btn btn-secondary">
              Manage Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default Dashboard;