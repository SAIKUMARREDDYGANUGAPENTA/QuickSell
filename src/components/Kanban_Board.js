import React, { useState, useEffect } from 'react';

import Card from './Card';
// import Card from './Card';

import './Navbar.css';
import './Kanban_Board.css';

const userColorMap = {
  'AnooAnoop sharma': '#FF5733',  
  'Yogesh': '#33FF57',                      
  'Shankar Kumar': '#3357FF',
  'Ramesh': '#F1C40F',
  'Suresh': '#9B59B6',
  // Add more mappings as needed
};

const Kanban_Board = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
    const [sortType, setSortType] = useState('title');
    const [selectedDisplay, setSelectedDisplay] = useState('status'); // Default display is 'status'
    const [cardData, setCardData] = useState([]);

    // Toggle dropdowns
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleStatusDropdown = () => setStatusDropdownOpen(!statusDropdownOpen);
    const togglePriorityDropdown = () => setPriorityDropdownOpen(!priorityDropdownOpen);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
                const data = await response.json();
                const mergedData = data.tickets.map(ticket => {
                    const user = data.users.find(user => user.id === ticket.userId);
                    return { ...ticket, userName: user ? user.name : 'Unknown' };
                });
                setCardData(mergedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Get priority icon
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 0: return `${process.env.PUBLIC_URL}/icons/No_priority.png`;
            case 1: return `${process.env.PUBLIC_URL}/icons/Low_Priority.svg`;
            case 2: return `${process.env.PUBLIC_URL}/icons/Medium_Priority.svg`;
            case 3: return `${process.env.PUBLIC_URL}/icons/High_Priority.svg`;
            case 4: return `${process.env.PUBLIC_URL}/icons/Urgent_Priority_grey.svg`;
            default: return `${process.env.PUBLIC_URL}/icons/No_priority.png`;
        }
    };

    // Sort function
    const sortCards = (cards) => {
        return cards.sort((a, b) => {
            if (sortType === 'priority') {
                if (a.priority !== b.priority) {
                    return b.priority - a.priority;
                }
                return a.title.localeCompare(b.title);
            } else {
                if (a.title !== b.title) {
                    return a.title.localeCompare(b.title);
                }
                return a.priority - b.priority;
            }
        });
    };

    // Filter by status
    const filterByStatus = (status) => {
        const filteredCards = cardData.filter(card => card.status === status);
        return sortCards(filteredCards);
    };



    // Filter by priority
    const filterByPriority = (priority) => {
        const filteredCards = cardData.filter(card => card.priority === priority);
        return sortCards(filteredCards);
    };

    // Get initials
    const getInitials = (name) => {
        const nameParts = name.split(' ');
        return nameParts.length === 1
            ? nameParts[0].substring(0, 2).toUpperCase()
            : nameParts.map(part => part[0].toUpperCase()).join('');
    };


    
    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Todo': return `${process.env.PUBLIC_URL}/icons/Todo.svg`;
            case 'In progress': return `${process.env.PUBLIC_URL}/icons/in_Progress_image.png`;
            case 'Backlog': return `${process.env.PUBLIC_URL}/icons/Backlog.svg`;
            case 'Done': return `${process.env.PUBLIC_URL}/icons/Done.svg`;
            case 'Cancelled': return `${process.env.PUBLIC_URL}/icons/Cancelled.svg`;
            default: return `${process.env.PUBLIC_URL}/icons/default.svg`;
        }
    };

    // Handle sort change
    const handleSortChange = (type) => {
        setSortType(type);
        setPriorityDropdownOpen(false); // Close dropdown after selection
    };

    // Handle display change
    const handleDisplayChange = (displayType) => {
        setSelectedDisplay(displayType);
        setDropdownOpen(false); // Close the dropdown after selection
    };

    // const userColor = userName ? userColorMap[userName] || '#cccccc' : '#cccccc';

    // Get card count by status
    const getCardCount = (status) => filterByStatus(status).length;
    const getCardCountprioriy = (priority) => filterByPriority(priority).length;

    return (
        <>
            <div className="App">
                <nav className="navbar">
                    <div className="dropdown">
                        <button className="dropdown-btn" onClick={toggleDropdown}>
                            <img src="./icons/Display.svg" alt="icon" className="btn-icon" />
                            <p style={{ marginLeft: '10px', fontSize: '16px' }}>Display</p>
                            <img src="./icons/Down_arrow.png" alt="icon"  style={{ width: '20px', height: '15px',marginLeft:'8px'}}/>
                        </button>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-row">
                                    <div className="dropdown-item">Grouping</div>
                                    <button className="dropdown-side-button" onClick={toggleStatusDropdown}>
                                        Status
                                        <img src="./icons/Down_arrow.png" alt="icon" className="icon-in-button" style={{ width: '20px', height: '15px'}}/>
                                    </button>

                                    {statusDropdownOpen && (
                                        <div className="dropdown-submenu1">
                                            <div className="dropdown-item1" onClick={() => handleDisplayChange('status')}>Status</div>
                                            <div className="dropdown-item1" onClick={() => handleDisplayChange('user')}>User</div>
                                            <div className="dropdown-item1" onClick={() => handleDisplayChange('priority')}>Priority</div>
                                        </div>
                                    )}
                                </div>

                                <div className="dropdown-row">
                                    <div className="dropdown-item">Ordering</div>
                                    <button className="dropdown-side-button" onClick={togglePriorityDropdown}>
                                        Priority
                                        <img src="./icons/Down_arrow.png" alt="icon" style={{ width: '20px', height: '15px'}}/>
                                    </button>

                                    {priorityDropdownOpen && (
                                        <div className="dropdown-submenu2">
                                            <div className="dropdown-item1" onClick={() => handleSortChange('priority')}>Priority</div>
                                            <div className="dropdown-item1" onClick={() => handleSortChange('title')}>Title</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {selectedDisplay === 'status' && (
                <div className="container1">
                    {['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'].map(status => (
                        <div key={status} className="column">
                            <h3 style={{ marginBottom: '20px' }}>
                                <img src={getStatusIcon(status)} alt={status}  style={{ width: '20px', height: '20px'}}/>
                                <span style={{ marginLeft: '10px' }}>{status} ({getCardCount(status)})</span>
                                <span style={{ marginLeft: '60px' }}>
                                    <img src={`${process.env.PUBLIC_URL}/icons/add.svg`} alt="Add" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                                    <img src={`${process.env.PUBLIC_URL}/icons/3_dot_menu.svg`} alt="Menu" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                                </span>
                            </h3>
                            {filterByStatus(status).map(card => (
                                <Card
                                    key={card.id}
                                    id={card.id}
                                    title={card.title}
                                    feature={card.tag[0]}
                                    userName={card.userName}
                                    status={card.status}
                                    priority={card.priority}
                                    priorityIcon={getPriorityIcon(card.priority)}
                                    
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {selectedDisplay === 'user' && (
                <div className="container2">
                    {Object.entries(cardData.reduce((acc, card) => {
                        if (!acc[card.userName]) {
                            acc[card.userName] = [];
                        }
                        acc[card.userName].push(card);
                        return acc;
                    }, {})).map(([userName, userCards]) => {
                        const sortedUserCards = sortCards(userCards); // Sort by title and priority
                        return (
                            <div key={userName} className="column">
                                <h3 style={{ marginBottom: '50px' }}>
                                <div className="user-initials" style={{ backgroundColor: userColorMap[userName] }}>
                               
                                    {getInitials(userName)}
                                    <div className="avatar-status"></div>
                                
                                  </div>
                                    <span style={{ marginLeft: '45px',fontSize:'15px' }}>{userName} ({sortedUserCards.length})</span>
                                    <span style={{ marginLeft: '20px' }}>
                                        <img src={`${process.env.PUBLIC_URL}/icons/add.svg`} alt="Add" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                                        <img src={`${process.env.PUBLIC_URL}/icons/3_dot_menu.svg`} alt="Menu" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                                    </span>
                                </h3>
                                {sortedUserCards.map(card => (
                                    <Card
                                        key={card.id}
                                        id={card.id}
                                        title={card.title}
                                        feature={card.tag[0]}
                                        // userName={card.userName}
                                        status={card.status}
                                        priority={card.priority}
                                        iconUrl={getStatusIcon(card.status)}
                                        priorityIcon={getPriorityIcon(card.priority)}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedDisplay === 'priority' && (
                <div className="container3">
                    {[0, 4, 3, 2, 1].map(priority => (
                        <div key={priority} className="column">
                            <h3 style={{ marginBottom: '20px' }}>
                                <img src={getPriorityIcon(priority)} alt={`Priority ${priority}`} style={{ width: '15px', height: '15px' }}/>
                                <span style={{ marginLeft: '10px' }}>
                                {priority === 0 ? "No Priority" :
                                priority === 4 ? "Urgent" :
                                priority === 3 ? "High" :
                                priority === 2 ? "Medium" :
                                "Low"}
                                ({getCardCountprioriy(priority)})
                              </span>
                                {/* <span style={{ marginLeft: '10px' }}>Priority {priority} ({getCardCountprioriy(priority)})</span> */}
                                <span style={{ marginLeft: '60px' }}>
                                    <img src={`${process.env.PUBLIC_URL}/icons/add.svg`} alt="Add" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                                    <img src={`${process.env.PUBLIC_URL}/icons/3_dot_menu.svg`} alt="Menu" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                                </span>
                            </h3>
                            {filterByPriority(priority).map(card => (
                                <Card
                                    key={card.id}
                                    id={card.id}
                                    title={card.title}
                                    feature={card.tag[0]}
                                    userName={card.userName}
                                    status={card.status}
                                    priority={card.priority}
                                    // iconUrl={getStatusIcon(card.status)}
                                    // priorityIcon={getPriorityIcon(card.priority)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Kanban_Board;
