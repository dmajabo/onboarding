import {Slider} from "@material-ui/core";
import React from "react";

export default ({lighting, setLighting}) => <div>i show lights {JSON.stringify(lighting)}
    <Slider min={-5}
            max={5}
            step={0.01 }
            value={lighting[0]}
            onChange={(_, v) => {
                let newArr = [...lighting]; // copying the old datas array
                newArr[0] = v
                setLighting(newArr);
            }}/>


    <Slider min={-5}
            max={5}
            step={0.01 }
            value={lighting[1]}
            onChange={(_, v) => {
                let newArr = [...lighting]; // copying the old datas array
                newArr[1] = v
                setLighting(newArr);
            }}/>


    <Slider min={-5}
            max={5}
            step={0.01 }
            value={lighting[2]}
            onChange={(_, v) => {
                let newArr = [...lighting]; // copying the old datas array
                newArr[2] = v
                setLighting(newArr);
            }}/>
</div>

