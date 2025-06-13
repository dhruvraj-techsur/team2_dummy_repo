import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data fetching
  async function fetchDashboardData() {
    if (isLoading) return null;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { title: 'Total Projects', value: '12', description: 'Active projects in your portfolio' },
        { title: 'Tasks Completed', value: '89', description: 'Tasks completed this month' },
        { title: 'Team Members', value: '8', description: 'Active team members' },
        { title: 'Performance Score', value: '94%', description: 'Your overall performance rating' }
      ];
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      return null;
    }
  }

  const DashboardCards = () => {
    const data = await fetchDashboardData();
    return data || [];
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <button 
          onClick={handleLogout}
          disabled={isLoading || isLoggingOut}
          className={`px-4 py-2 rounded-lg ${user?.name ? 'bg-success text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-500'}`}
        >
          {isLoading ? 'Loading...' : 'Logout'}
        </button>
      </div>

      {/* Content Grid */}
      <div className="dashboard-content">
        <h2>Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DashboardCards().map((item, index) => (
            <div key={index} className="dashboard-card w-full">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text text-muted-foreground">
                {item.value}
              </p>
              <p className="card-text">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="action-section bg-card shadow-sm p-4">
          <h3>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-primary w-full py-3 px-6 rounded-lg hover:bg-gray-50">
              Create New Project
            </button>
            <button className="btn btn-secondary w-full py-3 px-6 rounded-lg hover:bg-gray-50">
              View Reports
            </button>
            <button className="btn btn-secondary w-full py-3 px-6 rounded-lg hover:bg-gray-50">
              Manage Team
            </button>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-auto h-[100px] bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-.756 1.73C8.37 14.62 4 17.38 4 21 4 22.74 5.37 23.7 9 23.7c0-4.28-4.28-7.86-7.86-7.86-2.59 0-5.14 1.18-7.86 3.74-2.59 0 4.28 4.28 7.86 7.86 7.86 2.59 0 5.14-1.18 7.86-3.74 2.59 0 4.28 4.28 7.86 7.86zm6.14-11.86v4h4v-4H5.86v4h4V9z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Dashboard;