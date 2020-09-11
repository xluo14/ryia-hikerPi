import React, { Component } from 'react';
import Demo from './Demo'
import SetSearch from "./SetSearch";
import Graph from "./Graph";
import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <main>
                <SetSearch />
                <Demo />
                </main>
            </div>
        )
    }
}

export default App;