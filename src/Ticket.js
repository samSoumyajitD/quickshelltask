import React from 'react';
import './Ticket.css';


const getStatusColor = (status) => {
  switch (status) {
    case 'Done':
      return '#28a745'; // Green
    case 'In Progress':
      return '#ffc107'; // Yellow
    case 'Open':
      return '#17a2b8'; // Blue
    default:
      return '#6c757d'; // Gray
  }
};

const Ticket = ({ ticket, users }) => {
  const user = users.find(u => u.id === ticket.userId) || { name: 'Unknown User' };
  const statusColor = getStatusColor(ticket.status); 

  return (
    <div className="ticket" style={{ borderLeftColor: statusColor }}>
      <h3>{ticket.title}</h3>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Assigned to:</strong> {user.name}</p>
    </div>
  );
};

export default Ticket;
