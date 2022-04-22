import React, { useState } from 'react';
import { extent, max } from 'd3-array';
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import generateDateValue from '@visx/mock-data/lib/generators/genDateValue';
import {AxisBottom } from "@visx/axis";

const axisColor = '#929292';

const axisBottomTickLabelProps = {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: axisColor,
};

const lineCount = 5;
const series = new Array(lineCount).fill(null).map((_, i) =>
    // vary each series value deterministically
    generateDateValue(25, /* seed= */ i / 72).sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
    ),
);
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d) => d.date;
const getY = (d) => d.value;

// scales
const xScale = scaleTime({
    domain: extent(allData, getX),
});
const yScale = scaleLinear({
    domain: [0, max(allData, getY)],
});


export default function Example({ width, height }) {
    const [curveType ] = useState('curveNatural');
    const svgHeight =  height;
    const lineHeight = svgHeight / lineCount;

    // update scale output ranges
    xScale.range([0, width - 50]);
    yScale.range([lineHeight - 2, 0]);

    return (
        <div className="visx-curves-demo">

            <svg width={width} height={svgHeight}>

                <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14} />
                {width > 8 &&
                series.map((lineData, i) => {
                    const even = i % 2 === 0;
                    const markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
                    return (
                        <Group key={`lines-${i}`} top={1 * lineHeight} left={13}>

                            <LinePath
                                curve={allCurves[curveType]}
                                data={lineData}
                                x={d => xScale(getX(d)) ?? 0}
                                y={d => yScale(getY(d)) ?? 0}
                                stroke="#333"
                                strokeWidth={even ? 2 : 1}
                                strokeOpacity={even ? 0.6 : 1}
                                shapeRendering="geometricPrecision"
                                markerMid="url(#marker-circle)"
                                markerEnd={markerEnd}
                                />
                        </Group>
                );
                })}



                <AxisBottom
                    top={50}
                    scale={xScale}
                    numTicks={width > 520 ? 10 : 5}
                    stroke={axisColor}
                    tickStroke={axisColor}
                    tickLabelProps={() => axisBottomTickLabelProps}
                />

                </svg>

                </div>
                );
                }
