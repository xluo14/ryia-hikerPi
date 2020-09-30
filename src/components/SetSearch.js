import React from 'react';
import {Select, Form, Button, Input, DatePicker} from 'antd';
import useGlobal from "../store";


export default function SetSearch() {
    const [globalState, globalActions] = useGlobal();

    const onFinish = (e) => {
        const searchValue = {
            startDate: e.startDate ? e.startDate.format('YYYY-MM-DD') : "",
            endDate: e.endDate ? e.endDate.format('YYYY-MM-DD') : "",
            ticker: e.ticker,
            contractExpire: "131",
        };
        globalActions.setSearchValue(searchValue);
    };


    return (
        <Form
            layout="inline"
            onFinish={onFinish}
        >
            <Form.Item name="ticker" initialValue={"CL"}>
                <Select
                    placeholder="Ticker"
                    allowClear>
                    <Select.Option value="CL">CL</Select.Option>
                    <Select.Option value="CN">CN</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="startDate">
                <DatePicker placeholder="Start Date"/>
            </Form.Item>
            <Form.Item name="endDate">
                <DatePicker placeholder="End Date"/>
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
