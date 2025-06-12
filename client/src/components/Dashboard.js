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

const ActivityLog = ({ log }) => <p className={styles.activityLog}>{log}</p>;

ActivityLog.propTypes = {
  log: PropTypes.string.isRequired,
};

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

  if (!user) {
    return <p>Error: User data not available</p>;
  }

  const dashboardData = [
    { title: 'Total Projects', value: '12', description: 'Active projects in your portfolio' },
    { title: 'Tasks Completed', value: '89', description: 'Tasks completed this month' },
    { title: 'Team Members', value: '8', description: 'Active team members' },
    { title: 'Performance Score', value: '94%', description: 'Your overall performance rating' },
  ];

  const activityLogs = [
    'Project "E-commerce Platform" updated - 2 hours ago',
    'New team member "Sarah Johnson" joined - 1 day ago',
    'Task "User Authentication" completed - 3 days ago',
    'Monthly report generated - 1 week ago',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p className={styles.dashboardSubtitle}>Here's your personalized dashboard overview</p>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        <div className={styles.dashboardContent}>
          {dashboardData.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </div>

        <div className={styles.activityContainer}>
          <h3 className={styles.activityTitle}>Recent Activity</h3>
          <div className={styles.activityLogs}>
            {activityLogs.map((log, index) => (
              <ActivityLog key={index} log={log} />
            ))}
          </div>
        </div>

        <div className={styles.quickActionsContainer}>
          <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
          <div className={styles.quickActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Create New Project</button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>View Reports</button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>Manage Team</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;