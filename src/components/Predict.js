import React, { useState, useEffect } from 'react';
import {
    Chart,
    View,
    Tooltip,
    Schema,
    LineAdvance,
    Axis,
    Interval,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import useGlobal from "../store";

const chart = (data, globalMin, globalMax) => {
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
                    tickCount: 5,
                    mask: 'YYYY-MM-DD'
                },
                volume: { alias: '成交量' },
                open: {
                    alias: '开盘价' },
                close: {
                    alias: '收盘价' },
                high: {
                    alias: '最高价' },
                low: {
                    alias: '最低价' },
                adjclose: {
                    alias: '股票价格' },
                range: {
                    min: globalMin,
                    max: globalMax,
                },
                predict: {
                    min: globalMin,
                    max: globalMax,
                    alias: '预测价格' }
            }}
        >
            <Tooltip
                /*showTitle={false}
                showMarkers={true}
                itemTpl={'<li class="g2-tooltip-list-item" data-index={index}>'
                + '<span style="background-color:{color};" class="g2-tooltip-marker">{date}</span>'
                + '{name}{value}</li>'}*/
                showCrosshairs
                shared
            />
            <View
                data={data}
                region={{
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0.7 },
                }}
            >
                <Axis
                    name="predict"
                    visible={false}
                />
                <Axis
                    name="range"
                    visible={true}
                />
                <Schema
                    position="date*range"
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

                ></Schema>
                <LineAdvance start={{ date: data.predict}}
                             end={{ date: data.predict}}
                             point={{ size: 3 }}
                             shape="smooth"
                             position="date*predict"
                             color="blue"
                             label="output"
                             /*tooltip={[
                                 'date*predict',
                                 (date, predict) => {
                                     return {
                                         name: date,
                                         value: '<br><span style="padding-left: 16px">预测价格：' + predict + '</span>'
                                     }}
                             ]}*/
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
                    tooltip={['date*volume', (date, volume) => {
                        return {
                            name: date,
                            value: '<br/><span style="padding-left: 16px">成交量：' + volume + '</span><br/>'
                        };
                    }]}
                />
            </View>
        </Chart>)
}
function Predict() {
    const [globalState, globalActions] = useGlobal()
    const {status, searchResult, predictResult, searchValue, globalMin, globalMax} = globalState;
    useEffect(() => {
        globalActions.getDataBySearch(searchValue);
        globalActions.getDataByCompare(searchValue);
        console.log(globalMin);
    }, [searchValue])
    useEffect(() => {
        globalActions.getGlobalMinMax(searchResult, predictResult);
        console.log(globalMin);
    }, [searchResult, predictResult])
    // 转换数据
    function convertData(searchResult, predictResult) {
        const joinedData = [...searchResult.data, ...predictResult];
        const ds = new DataSet();
        const dv = ds.createView();
        dv.source(joinedData)
            .transform({
                type: 'map',
                callback: obj => {
                    obj.trend = (obj.open <= obj.close) ? '上涨' : '下跌';
                    obj.range = [obj.open, obj.close, obj.high, obj.low];
                    obj.value = [obj.adjclose, obj.predict]
                    return obj;
                }
            });
        console.log(joinedData)
        return dv.rows;
    }

    return (
        <>
            {status === "INITIAL" && chart(convertData(searchResult, predictResult),globalMin, globalMax)}
            {status === "LOADING" && <h4>Loading...</h4>}
            {status === "SUCCESS" && chart(convertData(searchResult, predictResult),globalMin, globalMax)}
            {status === "EMPTY" && <h4>This have zero result</h4>}
            {status === "NOT_FOUND" && <h4>404 - search not found</h4>}
            {status === "ERROR" && <h4>Connection Error</h4>}
        </>
    );
}

export default Predict;