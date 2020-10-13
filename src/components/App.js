import React from 'react';
import SetSearch from "./SetSearch";
import Graph from "./Graph";
import Predict from "./Predict"
import '../styles/App.css';
import { Row, Col } from 'antd';
import * as actions from '../actions';
import Sentiment from "./Sentiment"

function App () {
        return (
            <div className="App">
                <main>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Graph />
                                <Col span={7}></Col>
                                <Col span={13}><SetSearch /></Col>
                                <Col span={7}></Col>
                                <Predict />
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Sentiment />
                        </Col>
                    </Row>
                </main>
            </div>
        )
}

export default App;