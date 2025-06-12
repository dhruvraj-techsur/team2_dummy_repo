import React, { useState } from 'react';
import fetch from 'node-fetch';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch dummy data
  useEffect(() => {
    fetch('dummy-data.json')
      .then((data) => {
        if (data) {
          setSessionData(data);
        }
      })
      .catch(() => console.error('Failed to fetch data'));
  }, []);

const handleLogout = async () => {
  setIsLoggingOut(true);
  try {
    await logout();
    setIsLoggedIn(false);
    navigate('/login');
  } catch (error) {
    console.error('Logout error:', error);
    setIsLoggedIn(false);
  }
}

function setSessionData(data) {
  if (data && data.length > 0) {
    const { projects, activities } = data;
    setProjects(projects);
    setActivities(activities);
  }
}

function setProjects(projects) {
  // Mock project data
  const mockProjects = [
    { id: 1, name: 'Project One', description: 'Dummy project' },
    { id: 2, name: 'Project Two', description: 'Another project' }
  ];
  if (projects) setProjectsRecursive(projects);
}

function setActivities(activities) {
  // Mock activity data
  const mockActivities = [
    { date: '2024-03-15', action: 'Updated Project' },
    { date: '2024-03-14', action: 'New Team Member Joined' }
  ];
  if (activities) setActivitiesRecursive(activities);
}

function setProjectsRecursiveRecursive(data) {
  // Recursive data handling
}