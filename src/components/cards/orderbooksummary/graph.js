import styled from "styled-components";
import { format } from "date-fns";
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    Tooltip,
    XYChart
} from "@visx/xychart";

let DEFAULT = {
        data : [   {     "x": "2018-03-01",     "y": 30   },   {     "x": "2018-04-01",     "y": 16   },   {     "x": "2018-05-01",     "y": 17   },   {     "x": "2018-06-01",     "y": 24   } ]
    }

const tickLabelOffset = 10;

const accessors = {
    xAccessor: (d) => new Date(`${d.x}T00:00:00`),
    yAccessor: (d) => d.y
};

const Graph = ({card=DEFAULT}) => {
    return (
        <ChartContainer>
            <XYChart
                height={270}
                margin={{ left: 35, top: 35, bottom: 35, right: 35 }}
                xScale={{ type: "time" }}
                yScale={{ type: "linear" }}
            >
                <AnimatedGrid
                    columns={false}
                    numTicks={4}
                    lineStyle={{
                        stroke: "#e1e1e1",
                        strokeLinecap: "round",
                        strokeWidth: 1
                    }}
                    strokeDasharray="0, 4"
                />
                <AnimatedAxis
                    hideAxisLine
                    hideTicks
                    orientation="bottom"
                    tickLabelProps={() => ({ dy: tickLabelOffset })}
                    left={30}
                    numTicks={4}
                />
                <AnimatedAxis
                    hideAxisLine
                    hideTicks
                    orientation="left"
                    numTicks={4}
                    tickLabelProps={() => ({ dx: -10 })}
                />

                <AnimatedLineSeries
                    stroke="#008561"
                    dataKey="primary_line"
                    data={card.data}
                    {...accessors}
                />
                <Tooltip
                    snapTooltipToDatumX
                    snapTooltipToDatumY
                    showSeriesGlyphs
                    glyphStyle={{
                        fill: "#008561",
                        strokeWidth: 0
                    }}
                    renderTooltip={({ tooltipData }) => {
                        return (
                            <TooltipContainer>
                                {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                                    const [key, value] = lineDataArray;

                                    return (
                                        <div className="row" key={key}>
                                            <div className="date">
                                                {format(accessors.xAccessor(value.datum), "MMM d")}
                                            </div>
                                            <div className="value">
                                                <ColoredSquare color="#008561" />
                                                {accessors.yAccessor(value.datum)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </TooltipContainer>
                        );
                    }}
                />
            </XYChart>
        </ChartContainer>
    );
};



const ChartContainer = styled.div`
  text {
    font-family: "Untitled Sans", sans-serif;
  }

  .visx-axis-tick {
    text {
      font-size: 12px;
      font-weight: 400;
      fill: #666666;
    }
  }
`;

const ColoredSquare = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
`;

const TooltipContainer = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;

  .date {
    font-size: 12px;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000000;
  }
`;

export default Graph;
