import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import ControlPanel from './ControlPanel';
import './App.css';

// Helper function to fetch data
const fetchData = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  return await response.json();
};


const groupTickets = (tickets, groupBy) => {
  switch(groupBy) {
    case 'status':
      return tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    case 'user':
      return tickets.reduce((acc, ticket) => {
        acc[ticket.userId] = acc[ticket.userId] || [];
        acc[ticket.userId].push(ticket);
        return acc;
      }, {});
    case 'priority':
      return tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = acc[ticket.priority] || [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    default:
      return { All: tickets };
  }
};

// Sorting function
const sortTickets = (tickets, sortBy) => {
  return tickets.sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority; // Higher priority first
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title); // Alphabetical order
    }
    return 0;
  });
};

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => loadFromLocalStorage('groupBy', 'status'));
  const [sortBy, setSortBy] = useState(() => loadFromLocalStorage('sortBy', 'priority'));

  useEffect(() => {
    fetchData().then(data => {
      setTickets(data.tickets);
      setUsers(data.users);
    });
  }, []);

  const groupedTickets = groupTickets(tickets, groupBy);
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = sortTickets(groupedTickets[key], sortBy);
    return acc;
  }, {});

  const handleGroupChange = (value) => {
    setGroupBy(value);
    saveToLocalStorage('groupBy', value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    saveToLocalStorage('sortBy', value);
  };

  return (
    <div className="kanban-board">
      <ControlPanel
        groupBy={groupBy}
        sortBy={sortBy}
        onGroupChange={handleGroupChange}
        onSortChange={handleSortChange}
      />
      <div className="board-columns">
        {Object.keys(sortedGroupedTickets).map(group => (
          <div key={group} className="column">
            <h2>{group}</h2>
            {sortedGroupedTickets[group].map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} users={users} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Save user preferences to local storage
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Load user preferences from local storage
const loadFromLocalStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export default App;
