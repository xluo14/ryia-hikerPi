import React, { useState, useEffect } from 'react';
import {
    Chart,
    View,
    Tooltip,
    Schema,
    Line,
    Point,
    Axis,
    Interval,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import * as actions from '../actions';
import useGlobal from "../store";

const chart = (data) => {
    return (
        <Chart
            height={400}
            padding={[10, 40, 40, 40]}
            data={data}
            autoFit
            scale={{
                date: {
                    type: 'timeCat',
                    range: [0, 1],
                    tickCount: 4,
                },

                volume: { alias: '成交量' },
                open: { alias: '开盘价' },
                close: { alias: '收盘价' },
                high: { alias: '最高价' },
                low: { alias: '最低价' },
                adjclose: { alias: '股票价格' }
            }}
        >
            <Tooltip
                showTitle={false}
                showMarkers={true}
                itemTpl={'<li class="g2-tooltip-list-item" data-index={index}>'
                + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
                + '{name}{value}</li>'}
            />
            <View
                data={data}
                region={{
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0.7 },
                }}
            >
                <Line shape="smooth" position="date*predict" color="blue" label="output"/>
                <Point position="date*predict" color="blue" />
                <Schema
                    position={'date*range'}
                    shape={'candle'}
                    color={[
                        'trend', val => {
                            if (val === '上涨') {
                                return '#f04864';
                            }

                            if (val === '下跌') {
                                return '#2fc25b';
                            }
                        }
                    ]}
                    tooltip={[
                        'date*open*close*high*low',
                        (date, open, close,high,low) => {
                            return {
                                name: date,
                                value: '<br><span style="padding-left: 16px">开盘价：' + open + '</span><br/>'
                                    + '<span style="padding-left: 16px">收盘价：' + close + '</span><br/>'
                                    + '<span style="padding-left: 16px">最高价：' + high + '</span><br/>'
                                    + '<span style="padding-left: 16px">最低价：' + low + '</span>'
                            }}
                    ]}
                />
            </View>
            <View
                data={data}
                region={{
                    start: { x: 0, y: 0.7 },
                    end: { x: 1, y: 1 },
                }}
                scale={{
                    volume: {
                        tickCount: 2,
                    }
                }}
            >
                <Axis name="date" tickLine={null} label={null} />
                <Axis name="volume"
                      label={{
                          formatter: val => {
                              return +val / 1000 + 'k';
                          }
                      }}
                />
                <Interval
                    position={'date*volume'}
                    color={['trend', val => {
                        if (val === '上涨') {
                            return '#f04864';
                        }

                        if (val === '下跌') {
                            return '#2fc25b';
                        }
                    }]}
                    tooltip={['date*volume', (time, volume) => {
                        return {
                            name: time,
                            value: '<br/><span style="padding-left: 16px">成交量：' + volume + '</span><br/>'
                        };
                    }]}
                />
            </View>
        </Chart>)
}
function Predict() {
    const [startDate, endDate] = actions.setNowSearch();
    const searchValue = {
        startDate: startDate,
        endDate: endDate,
        ticker: "CL",
        contractExpire: "131",
    };
    const searchResult  = actions.getDataBySearch(searchValue);
    const predictResult  = actions.getDataByCompare(searchValue);
    const  status = "success";
    console.log(searchResult.data)
    console.log(status)
    const data1 = searchResult.data;
    const data2 = predictResult.data;
    const joinedData = [...data1, ...data2];
    const [data, setData] = useState(joinedData);
/*    const obj = [];
    for (let i = 0; i < predictResult.output.length; i++) {
        obj.push({index: i,
            predict: predictResult.output[i]});
    }
    const [predictData, setPredictData] = useState(obj);
    console.log(searchResult.data)
    console.log(obj)
    console.log(status)*/
    useEffect((data) => {
        const ds = new DataSet();
        const dv = ds.createView();
        dv.source(data)
            .transform({
                type: 'map',
                callback: obj => {
                    obj.trend = (obj.open <= obj.close) ? '上涨' : '下跌';
                    obj.range = [obj.open, obj.close, obj.high, obj.low];
                    return obj;
                }
            });
        setData(dv.rows)
        console.log(data)
    }, [])
/*    useEffect((predictData) => {
        const ds = new DataSet();
        const dv = ds.createView();
        dv.source(obj);
        setPredictData(dv)
        console.log(predictData)
    }, [status])*/
    return (
        <>
            {status === "INITIAL" && chart(data)}
            {status === "LOADING" && <h4>Loading...</h4>}
            {status === "SUCCESS" && chart(data)}
            {status === "EMPTY" && <h4>This  have zero result</h4>}
            {status === "NOT_FOUND" && <h4>404 - search not found</h4>}
            {status === "ERROR" && <h4>Connection Error</h4>}
        </>
    );
}

export default Predict;