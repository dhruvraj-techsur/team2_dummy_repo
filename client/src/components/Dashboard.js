import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: 'Total Projects',
      value: '12',
      description: 'Active projects in your portfolio'
    },
    {
      id: 2,
      title: 'Tasks Completed',
      value: '89',
      description: 'Tasks completed this month'
    },
    {
      id: 3,
      title: 'Team Members',
      value: '8',
      description: 'Active team members'
    },
    {
      id: 4,
      title: 'Performance Score',
      value: '94%',
      description: 'Your overall performance rating'
    }
  ];

  const Card = ({ title, value, description }: { title: string; value: string; description: string }) => (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
        {value}
      </p>
      <p>{description}</p>
    </div>
  );

  const QuickActions = () => {
    return (
      <>
        <button className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 7L6 11H18a4 4 0 11-8 0 4 4 0 018 0zM3 13l4 4a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
          </svg>
        </button>

        <button className="btn btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M17 9l-4 4m4-8l-4 4m4 3l-4 4m7 -10c0-.65.75-1.51.83-2.07m.12.12.24.24a2.87 2.87 0 00.42.61L17 9z" clipRule="evenodd" />
          </svg>
        </button>

        <button className="btn btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M19 16l-7-7m7 7h18a4.408 4.408 0 01-7.656 0L9 20H5.245c-.89.65-.16 1.73.29 1.73s.73 1.73 1.24 1.73.29 2.646.29 4.408l7-7.656C5.63 6.31M16 12h18a4.408 4.408 0 01-7.656 0c-.89-.65-.16-1.73.29-1.73s.73-1.73 1.24-1.73.29-2.646.29-4.408z" clipRule="evenodd" />
          </svg>
        </button>
      </>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/logout')}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
          {!user.name && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.07a5.002 5.002 0 01-5.998 0A4.993 4.993 0 0113.99 6.007c-.86.442-1.755.952-2.276 1.496C5.625 13.256 1.84 10.372.156 7.5A3.988 3.988 0 002.99 2.006c.656-.374 1.496-.952 2.276-1.496C5.625 8.744 1.84 6.82.156 5.004A3.98 3.98 0 002.997 0c.86-.442 1.755-.952 2.276-1.496L18 16.07z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        {projects.map((project) => (
          <Card key={project.id} title={project.title} value={project.value} description={project.description} />
        ))}
      </div>

      <div className="summary">
        <h2>Dashboard Summary</h2>
        <p>Active Projects: {projects.length}</p>
        <p>Total Tasks: 197</p>
        <p>Team Size: 8</p>
        <p>Performance Score: 94%</p>
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;