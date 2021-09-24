import React from 'react';
import './App.css';
import Numbrix from "./components/Numbrix";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Numbrix/>
        </Provider>
    </div>
  );
}

export default App;
