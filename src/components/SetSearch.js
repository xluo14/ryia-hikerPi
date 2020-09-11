import React, {Component} from 'react';
import { Form, Input, Button, DatePicker} from 'antd';
import {searchUrl} from '../GetData';


class Search extends Component {
    constructor(){
        super();
        this.state = {
            startDate: 0,
            endDate: 0,
            ticker:1378219,
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(searchUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        startDate: values.startDate,
                        endDate: values.endDate,
                        ticker: values.ticker,
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            this.setState(
                                { startDate: values.startDate,
                                    endDate: values.endDate,
                                    ticker: values.ticker,}
                            )
                            return response.text();
                        }
                        throw new Error(response.stateText);
                    })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="search-form">
                <Form.Item label="Ticker">
                    {getFieldDecorator('ticker', {
                        rules: [{ required: true, message: 'Please input ticker.' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="startDate">
                    {getFieldDecorator('startDate', {
                        rules: [{ required: true, message: 'Please input startDate.' }],
                    })(<DatePicker />)}
                </Form.Item>
                <Form.Item label="endDate">
                    {getFieldDecorator('endDate', {
                        rules: [{ required: true, message: 'Please input endDate.' }],
                    })(<DatePicker />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const SetSearch = Form.create()(Search);
export default SetSearch;
