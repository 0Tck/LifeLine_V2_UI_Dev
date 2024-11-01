// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const [pendingResponse, allResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/pending-users'),
        axios.get('http://localhost:5000/api/admin/all-users')
      ]);

      setPendingUsers(pendingResponse.data);
      setAllUsers(allResponse.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users: ' + error.message);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/update-status/${userId}`, { status });
      alert(`User ${status} successfully`);
      fetchUsers(); // Refresh the lists
    } catch (error) {
      alert('Error updating user status: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <section className="pending-users">
        <h3>Pending Approvals</h3>
        {pendingUsers.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map(user => (
                <tr key={user._id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                  <td>
                    <button 
                      className="approve-btn"
                      onClick={() => handleUpdateStatus(user._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleUpdateStatus(user._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="all-users">
        <h3>All Users</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;