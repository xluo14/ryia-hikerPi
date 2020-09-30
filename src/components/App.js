import React, { useState, useEffect } from 'react';
import SetSearch from "./SetSearch";
import Graph from "./Graph";
import Predict from "./Predict"
import '../styles/App.css';
import * as actions from '../actions';

function App () {
        return (
            <div className="App">
                <main>
                    <Graph />
                    <SetSearch />
                    <Predict />
                </main>
            </div>
        )
}

export default App;