import { Color } from 'antd/es/color-picker';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the message or token from localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      setMessage("Welcome to the Application! You are logged in.");
    } else {
      setMessage("No token found, please login.");
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <a className="link" href="/logout">Logout</a>
      </div>
  );
};

export default Dashboard;
