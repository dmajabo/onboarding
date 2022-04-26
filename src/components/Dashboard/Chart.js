import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, CartesianAxis, Tooltip, ResponsiveContainer } from 'recharts';

function ChartTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <span>{payload[0].payload.x}</span>
                {/* <p style={{ color: 'white', width: '50px' }}>{JSON.stringify(payload[0])}</p> */}
                {/* <p style={{ color: 'white' }}>{JSON.stringify(Object.keys(payload[0]))}</p> */}
                {/* <div className="indicator"></div> */}
            </div>
        );
    }
    return null;
}

export default function Chart({ data }) {
    return (
        <ResponsiveContainer width={250} height={220}>
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
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Area type={'monotone'} dataKey="y" stroke="#fcaf77" fill="#fcaf7760" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
