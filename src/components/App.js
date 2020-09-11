import React, { Component } from 'react';
import Demo from './Demo'
import SetSearch from "./SetSearch";
import Graph from "./Graph";
import '../styles/App.css';
import { Route } from "react-router-dom";
let defaultPath = window.location.pathname;
defaultPath = defaultPath.replace(/\//g, '');
this.setState({
    base_url: `/${defaultPath}`
});
class App extends Component {
    render() {
        return (
            <div className="App">
                <main>
                    <Route
                        exact
                        path={`${this.state.base_url}/`}
                        render={props => <Intro state={this.state} {...props} />}
                    />
                    <Route
                        exact
                        path={`${this.state.base_url}/step-:stepNumber`}
                        render={props => (
                            <App
                                state={this.state}
                                updateStepValue={this.updateStepValue}
                                {...props}
                            />
                        )}
                    />
                <SetSearch />
                <Graph />
                <Demo />
                </main>
            </div>
        )
    }
}

export default App;