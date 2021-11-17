import React from 'react';
import './App.css';
import Numbrix from "./components/Numbrix";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App container-fluid">
        <Provider store={store}>
            <Numbrix/>
        </Provider>
    </div>
  );
}

export default App;
