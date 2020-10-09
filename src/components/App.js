import React from 'react';
import SetSearch from "./SetSearch";
import Graph from "./Graph";
import Predict from "./Predict"
import '../styles/App.css';
import { Row, Col } from 'antd';
import * as actions from '../actions';

function App () {
        return (
            <div className="App">
                <main>
                    <Graph />
                    <Row>
                        <Col span={7}></Col>
                        <Col span={13}><SetSearch /></Col>
                        <Col span={7}></Col>
                    </Row>
                    <Predict />
                </main>
            </div>
        )
}

export default App;