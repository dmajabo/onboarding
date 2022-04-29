import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    CartesianAxis,
    Tooltip,
    ResponsiveContainer,
    Rectangle
} from 'recharts';

const ChartCursor = props => {
    const { points, left, top, right, bottom, width, height } = props;
    const { x, y } = points[0];
    console.log(props);
    return <Rectangle fill="#fcaf77" x={x} y={y} width={width} height={2} />;
};

function ChartTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <span>{payload[0].payload.x}</span>
            </div>
        );
    }
    return null;
}

export default function Chart({ data }) {
    return (
        <AreaChart data={data} width={240} height={210}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#fcaf77" stopOpacity={0.8} />
                    <stop offset="90%" stopColor="#ffffff" stopOpacity={0.1} />
                </linearGradient>
            </defs>
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
            <Tooltip content={<ChartTooltip />} cursor={false} offset={5} />
            {/* <Tooltip content={<ChartTooltip />} cursor={<ChartCursor />} offset={5} /> */}
            <Area type={'monotone'} dataKey="y" stroke="#fcaf77" fill="url(#colorUv)" strokeWidth={2} />
        </AreaChart>
    );
}
