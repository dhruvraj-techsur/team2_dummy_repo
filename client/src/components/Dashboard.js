import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

const recentActivity = [
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
    } catch (error) {
      setError('Failed to log out');
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return <div>Error: User data not available</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p className="dashboard-intro">
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
        </header>

        <section className="dashboard-content">
          {dashboardData.map((item, index) => (
            <article key={item.title} className="dashboard-card">
              <h3>{item.title}</h3>
              <p className="dashboard-card-value">
                {item.value}
              </p>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <p key={index} className="activity-item">{activity}</p>
            ))}
          </div>
        </section>

        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-list">
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
        </section>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default Dashboard;