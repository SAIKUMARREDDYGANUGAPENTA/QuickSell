import React from 'react';
import './Card.css';
const userColorMap = {
  'AnooAnoop sharma': '#FF5733',  
  'Yogesh': '#33FF57',                      
  'Shankar Kumar': '#3357FF',
  'Ramesh': '#F1C40F',
  'Suresh': '#9B59B6',
  // Add more mappings as needed
};

const Card = ({ id, title, feature, userName, priority, priorityIcon, status, iconUrl }) => {
    const getInitials = (name) => {
        const nameParts = name.split(' ');
        if (nameParts.length === 1) {
            // Take the first two characters if only one part
            return nameParts[0].substring(0, 2).toUpperCase();
        }
        const initials = nameParts.map(part => part[0].toUpperCase()).join('');
        return initials;
    };

    const truncateTitle = (title, wordLimit) => {
        const words = title.split(' ');
        if (words.length <= wordLimit) return title;
        return words.slice(0, wordLimit).join(' ') + '...';
    };
    const userColor = userName ? userColorMap[userName] || '#cccccc' : '#cccccc';

    return (
        <div className="card">
            {userName && (
                <div className="avatar-circle" style={{ backgroundColor: userColor }}>
                    {getInitials(userName)}
                    <div className="avatar-status"></div>
                </div>
            )}
            <h4 style={{ color: 'rgb(218, 211, 211)' }}>
                {id}
            </h4>
            <p className="card-title">
                {iconUrl && <img src={iconUrl} alt={status} style={{ width: '15px', height: '15px' }} />}
                {truncateTitle(title, 6)}
            </p>
            <div className="footer">
                <div className="left">
                    {priority != null && priorityIcon && (
                        <div className="priority-icon">
                            <img src={priorityIcon} alt={`Priority: `} style={{ width: '15px', height: '15px' }}/>
                        </div>
                    )}
                    <div className="feature-container">
                        <div className="feature-circle"></div>
                        <span className="feature">{feature}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
