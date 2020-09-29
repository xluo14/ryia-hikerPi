import React, { useState, useEffect } from 'react';
import SetSearch from "./SetSearch";
import Graph from "./Graph";
import Predict from "./Predict"
import '../styles/App.css';
import * as actions from '../actions';

function App () {
    /*const [data, setData] = useState([]);
    const searchValue = {
        startDate: "2020-08-01",
        endDate: "2020-09-27",
        ticker: "CL",
        contractExpire: "131",
    };
    useEffect(() => {
      actions.getDataBySearch(searchValue).then(data => setData(data));
    })*/
        return (
            <div className="App">
                <main>
                    <Graph />
                    <SetSearch />
                    {/*<Predict />*/}
                </main>
            </div>
        )
}

export default App;