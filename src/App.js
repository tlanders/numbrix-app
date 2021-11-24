import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState, useEffect} from 'react';
import Numbrix from "./components/Numbrix";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        const apiData = await API.graphql({ query: listNotes });
        setNotes(apiData.data.listNotes.items);
    }

    async function createNote() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
    }

    async function deleteNote({ id }) {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
    }

    return (
    <div className="App container-fluid">
        <Provider store={store}>
            <Numbrix/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-6 mx-auto mt-3"}>
                        <h1>My Notes App</h1>
                        <input
                            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                            placeholder="Note name"
                            value={formData.name}
                        />
                        <input
                            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                            placeholder="Note description"
                            value={formData.description}
                        />
                        <button onClick={createNote}>Create Note</button>
                        <div style={{marginBottom: 30}}>
                            {
                                notes.map(note => (
                                    <div key={note.id || note.name}>
                                        <h2>{note.name}</h2>
                                        <p>{note.description}</p>
                                        <button onClick={() => deleteNote(note)}>Delete note</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
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
