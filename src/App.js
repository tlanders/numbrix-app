import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="numbrix">
        <h1>Welcome to Numbrix!</h1>
        <div className="numbrix-status">
          <button className="status-btn">Clear Board</button>
          <button className="status-btn">Begin Game</button>
          <button className="status-btn">Check Board</button>
        </div>
        <div className="numbrix-row">
          <input className="numbrix-cell" type="text" value={0}/>
          <input className="numbrix-cell" type="text" value={1}/>
          <input className="numbrix-cell" type="text" value={2}/>
          <input className="numbrix-cell" type="text" value={3}/>
        </div>
        <div className="numbrix-row">
          <input className="numbrix-cell" type="text" value={0}/>
          <input className="numbrix-cell" type="text" value={1}/>
          <input className="numbrix-cell" type="text" value={2}/>
          <input className="numbrix-cell" type="text" value={3}/>
        </div>
        <div className="numbrix-row">
          <input className="numbrix-cell" type="text" value={0}/>
          <input className="numbrix-cell" type="text" value={1}/>
          <input className="numbrix-cell" type="text" value={2}/>
          <input className="numbrix-cell" type="text" value={3}/>
        </div>
        <div className="numbrix-row">
          <input className="numbrix-cell" type="text" value={0}/>
          <input className="numbrix-cell" type="text" value={1}/>
          <input className="numbrix-cell" type="text" value={2}/>
          <input className="numbrix-cell" type="text" value={3}/>
        </div>

      </div>
    </div>
  );
}

export default App;
