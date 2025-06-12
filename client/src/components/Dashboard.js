import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';

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

const RECENT_ACTIVITY = [
  'Project "E-commerce Platform" updated - 2 hours ago',
  'New team member "Sarah Johnson" joined - 1 day ago',
  'Task "User Authentication" completed - 3 days ago',
  'Monthly report generated - 1 week ago'
];

const Dashboard = ({ user }) => {
  const { logout } = useAuth();
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
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p className={styles.dashboardHeaderDescription}>
              Here's your personalized dashboard overview
            </p>
          </div>
          <button 
            className={styles.logoutBtn}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        <div className={styles.dashboardContent}>
          {DASHBOARD_DATA.map((item) => (
            <div key={item.title} className={styles.dashboardCard}>
              <h3>{item.title}</h3>
              <p className={styles.dashboardCardValue}>
                {item.value}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.recentActivity}>
          <h3 className={styles.recentActivityTitle}>Recent Activity</h3>
          <div className={styles.recentActivityList}>
            {RECENT_ACTIVITY.map((activity) => (
              <p key={activity} className={styles.recentActivityItem}>{`• ${activity}`}</p>
            ))}
          </div>
        </div>

        <div className={styles.quickActions}>
          <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
          <div className={styles.quickActionsButtons}>
            <button className={styles.btnPrimary}>
              Create New Project
            </button>
            <button className={styles.btnSecondary}>
              View Reports
            </button>
            <button className={styles.btnSecondary}>
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