import React from 'react';
import { Select, Form, Button, DatePicker } from 'antd';
import useGlobal from "../store";
import config from "../config.json"

export default function SetSearch(){
    const [globalState, globalActions] = useGlobal();
    const {searchValue} = globalState;
    const tickers = config.ticker;
    const onFinish = (e) => {
        const searchValue = {
            startDate: e.startDate.format('YYYY-MM-DD'),
            endDate: e.endDate.format('YYYY-MM-DD'),
            ticker: e.ticker,
            contractExpire: "131",
        };
        globalActions.setSearchValue(searchValue);
        console.log(searchValue)
    };

    return (
            <Form
                offset = {5}
                layout = "inline"
                initialValues={{
                    ticker: "CL"
                }}
                  onFinish={onFinish}
                  >
                <Form.Item name="ticker">
                    <Select
                        placeholder="Ticker"
                        allowClear>
                        {tickers.map(ticker => {
                            return (
                                <Select.Option value={ticker}>{ticker}</Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="startDate">
                    <DatePicker placeholder="Start Date" />
                </Form.Item>
                <Form.Item name="endDate">
                    <DatePicker placeholder="End Date" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
{/*                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>*/}
                </Form.Item>
            </Form>
        );
}
