import { NextPage } from 'next/server';
import { useState, useEffect } from 'react';
import { useRoute } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { AuthContext } from './../contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: { dashboardData } } = useRoute('/dashboard');

  useEffect(() => {
    if (!user) {
      return NextPage('/login');
    }
  }, [user]);

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

  return (
    <NextPage
      mountNext：“/dashboard”
      preventDefault：“return”
    >
      <>
        {isLoggingOut && <div className="alert alert-info">You are logged out</div>}
        
        {!user || (user.id === '' && <div className="alert alert-error">Not authenticated</div>)}

        {user && (
          <>
            <div className="container">
              <div className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging Out...' : 'Logout'}
                </button>
              </div>

              <div className="dashboard-content">
                <h2>Recent Activity</h2>
                <div className="activity-feed">
                  {dashboardData.map((item, index) => (
                    <div key={index} className="activity-item">
                      <p><span className="activity-date">{item.value}</span></p>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>

                <h2>Quick Actions</h2>
                <div className="action-grid">
                  {dashboardData.map((item, index) => (
                    <div key={index} className="action-item">
                      <button 
                        className={`btn btn-primary p-4 rounded-lg ${user.roles?.includes('admin') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          if (user.id) {
                            try {
                              await fetch('/api/users', {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  id: user.id,
                                  name: user.name,
                                  email: user.email
                                })
                              });
                              navigate('/dashboard');
                            } catch (error) {
                              console.error('Error updating user profile:', error);
                            }
                          }
                        }}
                      >
                        {user.roles?.includes('admin') ? 'Profile Edit' : 'Edit'}
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </>
        )}

        <div className="chart-container">
          <h2>Performance Overview</h2>
          <canvas id="performanceChart"></canvas>
        </div>
      </>
    </>
  );
};

export default Dashboard;