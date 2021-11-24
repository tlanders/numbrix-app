import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Numbrix from "./components/Numbrix";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App container-fluid">
        <Provider store={store}>
            <Numbrix/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-3 mx-auto mt-3"}>
                        <AmplifySignOut />
                    </div>
                </div>
            </div>
        </Provider>
    </div>
  );
}

export default withAuthenticator(App);
