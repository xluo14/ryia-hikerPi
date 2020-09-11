import React, { useState, useEffect } from 'react';

import {
    Chart,
    View,
    Tooltip,
    Schema,
    Axis,
    Interval,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import {demoUrl} from '../GetData'

function Demo() {
    const [data, setData] = useState();
    useEffect(() => {
        fetch(demoUrl)
            .then(res => res.json())
            .then(data => {
                const ds = new DataSet();
                const dv = ds.createView();
                dv.source(data)
                    .transform({
                        type: 'map',
                        callback: obj => {
                            obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
                            obj.range = [obj.start, obj.end, obj.max, obj.min];
                            return obj;
                        }
                    });
                console.log(dv)
                setData(dv.rows);
            })
    }, [])

    return <Chart
        height={400}
        padding={[10, 40, 40, 40]}
        data={data}
        autoFit
        scale={{
            time: {
                type: 'timeCat',
                range: [0, 1],
                tickCount: 4,
            },

            volumn: { alias: '成交量' },
            start: { alias: '开盘价' },
            end: { alias: '收盘价' },
            max: { alias: '最高价' },
            min: { alias: '最低价' },
            range: { alias: '股票价格' }
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
            <Schema
                position={'time*range'}
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
                    'time*start*end*max*min',
                    (time, start, end, max, min) => {
                        return {
                            name: time,
                            value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
                                + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
                                + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
                                + '<span style="padding-left: 16px">最低价：' + min + '</span>'
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
                volumn: {
                    tickCount: 2,
                }
            }}
        >
            <Axis name="time" tickLine={null} label={null} />
            <Axis name="volumn"
                  label={{
                      formatter: val => {
                          return +val / 1000 + 'k';
                      }
                  }}
            />
            <Interval
                position={'time*volumn'}
                color={['trend', val => {
                    if (val === '上涨') {
                        return '#f04864';
                    }

                    if (val === '下跌') {
                        return '#2fc25b';
                    }
                }]}
                tooltip={['time*volumn', (time, volumn) => {
                    return {
                        name: time,
                        value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
                    };
                }]}
            />
        </View>
    </Chart>
}

export default Demo;