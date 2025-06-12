import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';

const DashboardCard = ({ title, value, description }) => (
  <div className={styles.dashboardCard}>
    <h3>{title}</h3>
    <p className={styles.dashboardCardValue}>{value}</p>
    <p>{description}</p>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setLogoutError('Logout failed. Please try again.');
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return <p>Error: User data not available.</p>;
  }

  const dashboardData = [
    { title: 'Total Projects', value: '12', description: 'Active projects in your portfolio' },
    { title: 'Tasks Completed', value: '89', description: 'Tasks completed this month' },
    { title: 'Team Members', value: '8', description: 'Active team members' },
    { title: 'Performance Score', value: '94%', description: 'Your overall performance rating' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p className={styles.dashboardHeaderSubtitle}>Here's your personalized dashboard overview</p>
          </div>
          <button 
            className={styles.logoutBtn}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        {logoutError && <p className={styles.error}>{logoutError}</p>}

        <div className={styles.dashboardContent}>
          {dashboardData.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </div>

        <div className={styles.recentActivity}>
          <h3 className={styles.recentActivityTitle}>Recent Activity</h3>
          <div className={styles.recentActivityList}>
            <p>• Project "E-commerce Platform" updated - 2 hours ago</p>
            <p>• New team member "Sarah Johnson" joined - 1 day ago</p>
            <p>• Task "User Authentication" completed - 3 days ago</p>
            <p>• Monthly report generated - 1 week ago</p>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
          <div className={styles.quickActionsButtons}>
            <button className={styles.btnPrimary}>Create New Project</button>
            <button className={styles.btnSecondary}>View Reports</button>
            <button className={styles.btnSecondary}>Manage Team</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;