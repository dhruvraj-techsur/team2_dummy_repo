import React, { useState, useEffect } from 'react';
import { useNavigate, useAuth } from 'react-router-dom';
import { useContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const [user, logout] = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    if (isLoading) {
      try {
        const data = await fetch('/api/dashboard');
        if (data.ok) {
          set_userdata(user?.email);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
  }, [isLoading]);

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

  const_userdata = useContext('user');

  return (
    <div className="container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
      </header>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`btn btn-outline-lg px-4 py-2 rounded-md text-white ${
          isLoggingOut ? 'bg-gray-300 hover:bg-gray-600' : 'hover:bg-blue-500'
        }`}
      >
        {isLoggingOut ? 'Logging Out...' : 'Logout'}
      </button>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {isLoading ? (
          <>
            <div>Loading dashboard data...</div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Project Data */}
              {[...user.data?.projects].map((project, index) => (
                <div key={index} className="card mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="text-sm text-gray-600">Last updated: {new Date(project.lastUpdated).toLocaleDateString()}</p>
                </div>
              ))}
              {/* Quick Actions */}
              {[...user.data?.quickActions].map((action, index) => (
                <div key={index} className="card mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3>{action.name}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <p className="mt-2 text-sm text-gray-700">{new Date(action.lastUpdated).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="section">
        <h2>Recent Activity</h2>
        {isLoading ? (
          <>
            <div>Loading recent activity...</div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              {[...user.data?.recentActivity].map((activity, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-500">•</span>
                    {new Date(activity.time).toLocaleDateString()}
                  </div>
                  <p><strong>{activity.user.name}:</strong> {activity.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Actions Buttons */}
      <div className="section">
        <h2>Quick Actions</h2>
        <div className="flex flex-wrap gap-4 justify-center items-center py-6">
          {[...user.data?.quickActions].map((action, index) => (
            <button 
              key={index} 
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                index === 0 ? 'bg-blue-500 text-white' :
                index === 1 ? 'bg-green-500 text-white' :
                index === 2 ? 'bg-purple-500 text-white' : 
                'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {action.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;