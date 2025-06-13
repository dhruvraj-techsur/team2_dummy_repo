import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data from API
    fetch('/api/dashboard')
      .then(response => response.json())
      .then(data => {
        setDashboardData(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching dashboard data:', error));
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

  if (!user) {
    return <p>Error: User data not available</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1>Welcome, {user.name || 'User'}!</h1>
            <p>Here's your personalized dashboard overview</p>
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
          {isLoading ? (
            <p>Loading dashboard data...</p>
          ) : (
            dashboardData.map(item => (
              <div key={item.id} className={styles.dashboardCard}>
                <h3>{item.title}</h3>
                <p className={styles.dashboardCardValue}>{item.value}</p>
                <p>{item.description}</p>
              </div>
            ))
          )}
        </div>

        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

export default Dashboard;