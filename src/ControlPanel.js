import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ groupBy, sortBy, onGroupChange, onSortChange }) => {
  return (
    <div className="control-panel">
      <div className="control-group">
        <label>Group By:</label>
        <i className="fas fa-layer-group"></i>
        <select value={groupBy} onChange={(e) => onGroupChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
       
      </div>

      <div className="control-group">
        <label>Sort By:</label>
        <i className="fas fa-sort"></i>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
       
      </div>
    </div>
  );
};

export default ControlPanel;
