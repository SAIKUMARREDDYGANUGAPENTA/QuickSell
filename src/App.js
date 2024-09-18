import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Kanban_Board from './components/Kanban_Board';

function App() {
  return (
<Router>
      <div className="App">
      
        <Routes>

          <Route path="/" element={<Kanban_Board />} />





          
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
