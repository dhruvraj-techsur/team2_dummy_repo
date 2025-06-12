import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Mock dashboard data
  const dashboardData = [
    {
      id: 'total-projects',
      title: 'Total Projects',
      value: '12',
      description: 'Active projects in your portfolio'
    },
    {
      id: 'tasks-completed',
      title: 'Tasks Completed',
      value: '89',
      description: 'Tasks completed this month'
    },
    {
      id: 'team-members',
      title: 'Team Members',
      value: '8',
      description: 'Active team members'
    },
    {
      id: 'performance-score',
      title: 'Performance Score',
      value: '94%',
      description: 'Your overall performance rating'
    }
  ];

  if (!user) {
    return <p>Loading...</p>;
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
          >
            Logout
          </button>
        </div>

        <div className="dashboard-content">
          {dashboardData.map((item) => (
            <div key={item.id} className="dashboard-card">
              <h3>{item.title}</h3>
              <p className="dashboard-card-value">
                {item.value}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-recent-activity">
          <h3 className="dashboard-recent-activity-title">Recent Activity</h3>
          <div className="dashboard-recent-activity-list">
            <p>• Project "E-commerce Platform" updated - 2 hours ago</p>
            <p>• New team member "Sarah Johnson" joined - 1 day ago</p>
            <p>• Task "User Authentication" completed - 3 days ago</p>
            <p>• Monthly report generated - 1 week ago</p>
          </div>
        </div>

        <div className="dashboard-quick-actions">
          <h3 className="dashboard-quick-actions-title">Quick Actions</h3>
          <div className="dashboard-quick-actions-buttons">
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
  user: PropTypes.object.isRequired,
};

export default Dashboard;