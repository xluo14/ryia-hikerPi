import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
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
                <Header />
                <main>
                    <Row>
                        <Graph />
                        <Col span={7}></Col>
                        <Col span={13}><SetSearch /></Col>
                        <Col span={7}></Col>
                        <Predict />
                    </Row>
                    <Sentiment />
                </main>
                    <Footer />
            </div>
        )
}

export default App;