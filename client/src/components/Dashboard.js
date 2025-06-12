// client/css/Dashboard.css
/* Dashboard Header Styles */
.dashboard-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Card Styles */
.dashboard-card {
  margin-bottom: 1.5rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

/* Recent Activity Styles */
.recent-activity-item {
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-activity-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
  transition: all 0.2s ease;
}

/* Quick Actions Styles */
 quick-actions-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #e6f4ea;
}