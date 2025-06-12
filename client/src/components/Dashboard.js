import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import express from 'express';
import cors from 'cors';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Middleware
  app.use(cors());
  app.use(express.json());

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.stack);
      setIsLoggingOut(false);
    }
  };

  // Mock dashboard data fetching from API
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/users', { headers: { 'Content-Type': 'application/json' } });
      const userData = await response.json();
      return userData.user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Get current user
  const userData = fetchUserData();

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          {userData?.name || 'User'}
        </div>
        <button 
          className="logout-btn" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging Out...' : 'Logout'}
        </button>
      </div>

      {/* Dashboard content */}

      <div className="dashboard-content">
        <h2>Welcome, {userData?.name || 'User'}!</h2>
        
        // Fetch and display dynamic data
        const fetchData = async () => {
          try {
            const response = await fetch('/api/dashboard', { headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching dashboard data:', error);
            return null;
          }
        };

        const userData = await fetchUserData();
        const dashboardData = await fetchData();

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

      {/* Additional components */}

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {dashboardData
            .filter(activity => activity.includes('updated'))
            .map(activity => (
              <p style={{ color: '#666' }}>• {activity}</p>
            ))}
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
  );
};

export default Dashboard;