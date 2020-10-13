import React, {useState, useEffect} from 'react';
import {Chart, Line, Point, View, Interval, Coordinate, Axis} from 'bizcharts';
import DataSet from "@antv/data-set"



function Sentiment(x) {
    // 数据源
    const rawData = [
        {
            month: "Jan",
            city: "Tokyo",
            temperature: 7
        },
        {
            month: "Jan",
            city: "London",
            temperature: 3.9
        },
        {
            month: "Feb",
            city: "Tokyo",
            temperature: 6.9
        },
        {
            month: "Feb",
            city: "London",
            temperature: 4.2
        },
        {
            month: "Mar",
            city: "Tokyo",
            temperature: 9.5
        },
        {
            month: "Mar",
            city: "London",
            temperature: 5.7
        },
        {
            month: "Apr",
            city: "Tokyo",
            temperature: 14.5
        },
        {
            month: "Apr",
            city: "London",
            temperature: 8.5
        },
        {
            month: "May",
            city: "Tokyo",
            temperature: 18.4
        },
        {
            month: "May",
            city: "London",
            temperature: 11.9
        },
        {
            month: "Jun",
            city: "Tokyo",
            temperature: 21.5
        },
        {
            month: "Jun",
            city: "London",
            temperature: 15.2
        },
        {
            month: "Jul",
            city: "Tokyo",
            temperature: 25.2
        },
        {
            month: "Jul",
            city: "London",
            temperature: 17
        },
        {
            month: "Aug",
            city: "Tokyo",
            temperature: 26.5
        },
        {
            month: "Aug",
            city: "London",
            temperature: 16.6
        },
        {
            month: "Sep",
            city: "Tokyo",
            temperature: 23.3
        },
        {
            month: "Sep",
            city: "London",
            temperature: 14.2
        },
        {
            month: "Oct",
            city: "Tokyo",
            temperature: 18.3
        },
        {
            month: "Oct",
            city: "London",
            temperature: 10.3
        },
        {
            month: "Nov",
            city: "Tokyo",
            temperature: 13.9
        },
        {
            month: "Nov",
            city: "London",
            temperature: 6.6
        },
        {
            month: "Dec",
            city: "Tokyo",
            temperature: 9.6
        },
        {
            month: "Dec",
            city: "London",
            temperature: 4.8
        }
    ];
    const [data, setData] = useState(rawData);
    useEffect(() => {
        const ds = new DataSet();
        const dv = ds.createView();
        dv.source(data)
            .transform({
                type: 'percent',
                field: 'temperature',
                dimension: 'city',
/*                GroupBy:[],*/
                as: 'percent'
            });
        console.log(dv)
        setData(dv.rows);
    }, [])

    return <Chart scale={{temperature: {min: 0}}} padding={[30,20,50,40]} autoFit height={320} data={data} >
        <View
            data={rawData}
            region={{
                start: {x: 0, y: 0},
                end: {x: 1, y: 0.8},
            }}
        >
        <Line shape="smooth" position="month*temperature" color="city" label="temperature"/>
        <Point position="month*temperature" color="city" />
        </View>
        <View
            data={data}
            scale={{percent:
            {formatter: val => {
                    val = Math.round(val* 100)  + '%';
                    return val;
                },
            }}}
            region={{
                start: {x: 0, y: 0.8},
                end: {x: 1, y: 1},
            }}>
            <Coordinate transpose />
            <Axis
                name="State"
                label={{
                    offset: 12
                }}
            />
            <Interval
                adjust={[{ type: 'stack' }]}
                position="temperature"
                color={"city"}
                label={['percent', { position: 'middle', offset: 0, style: { fill: '#fff' }, layout: { type: 'limit-in-shape' } }]}
            />
        </View>
    </Chart>
}



export default Sentiment;
