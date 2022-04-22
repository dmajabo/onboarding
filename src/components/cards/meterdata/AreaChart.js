import { XYChart, Axis, LineSeries } from "@visx/xychart";
import moment from 'moment'

const accessors = {
    xAccessor: (d) => new Date(d.time_bucket_day),
    yAccessor: (d) => d.sum
};

export default function App({data}) {
    return (
        <div className="App" style={{width : '100%' ,height : '100%'}} >
            <XYChart
                data={data}
                height={400}
                width={800}
                xScale={{ type: "band" }}
                yScale={{ type: "linear" }}
            >
                <Axis orientation="bottom" numTicks={5} tickFormat={(d) => {
                    return moment(d).format("D MM YYYY")
                }} />
                <Axis orientation="left" xleft={100} tickFormat={(d) => d/1000000000 + 'kWH'}/>
                <LineSeries data={data} dataKey="line" {...accessors} />
            </XYChart>
        </div>
    );
}
