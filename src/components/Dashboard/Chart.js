import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, CartesianAxis, Tooltip, ResponsiveContainer } from 'recharts';

function ChartCursor() {
    return <div className="cursor"></div>;
}

function ChartTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <span>{payload[0].payload.x}</span>
                {/* <p style={{ color: 'white', width: '50px' }}>{JSON.stringify(payload[0])}</p> */}
                {/* <p style={{ color: 'white' }}>{JSON.stringify(Object.keys(payload[0]))}</p> */}
                {/* <div className="cursor"></div> */}
            </div>
        );
    }
    return null;
}

export default function Chart({ data }) {
    return (
        <ResponsiveContainer width={240} height={210}>
            {/* <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
            </defs> */}
            <AreaChart data={data}>
                {/* <CartesianAxis /> */}
                {/* horizontalFill={'red'} */}
                <CartesianGrid vertical={false} stroke={'#8591AE'} strokeOpacity={0.2} />
                <YAxis
                    type="number"
                    dataKey="y"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tickCount={6}
                    width={40}
                />
                <Tooltip content={<ChartTooltip />} cursor={<ChartCursor />} />
                {/* <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#fcaf77', strokeWidth: 1 }} offset={5} /> */}
                {/* <Tooltip content={<ChartTooltip />} cursor={<div className="cursor">custom cursor</div>} /> */}
                <Area type={'monotone'} dataKey="y" stroke="#fcaf77" fill="#fcaf7760" strokeWidth={2} />
                {/* <Area type={'monotone'} dataKey="y" stroke="#fcaf77" fill="url(#colorUv)" /> */}
            </AreaChart>
        </ResponsiveContainer>
    );
}
