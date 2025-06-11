import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const DASHBOARD_DATA = [
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

const RECENT_ACTIVITIES = [
  'Project "E-commerce Platform" updated - 2 hours ago',
  'New team member "Sarah Johnson" joined - 1 day ago',
  'Task "User Authentication" completed - 3 days ago',
  'Monthly report generated - 1 week ago'
];

const Dashboard = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return <div className="error">User data not available</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user.name}!</h1>
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
          {DASHBOARD_DATA.map((item, index) => (
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
            {RECENT_ACTIVITIES.map((activity, index) => (
              <p key={index} className="recent-activity-item">{activity}</p>
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
  user: PropTypes.object.isRequired
};

export default Dashboard;