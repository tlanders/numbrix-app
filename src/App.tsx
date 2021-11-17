import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Numbrix from "./components/Numbrix";
import {Provider} from "react-redux";
import {store} from "./redux/store";

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
