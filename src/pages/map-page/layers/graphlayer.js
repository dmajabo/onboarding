import FlowMapLayer from '@flowmap.gl/core';

const data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {id : 1},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.418842792510986,
                    51.899256936515584
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {id : 2},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.423563480377197,
                    51.89635720136738
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {id : 3},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.428670406341553,
                    51.89945554166387
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {id : 4},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.429035186767577,
                    51.898369822800966
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {id : 5},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.426116943359374,
                    51.89864787525295
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {id : 6},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.419293403625487,
                    51.89719139092751
                ]
            }
        }
    ]
};


const GraphLayer = (props) => {

    //console.log(props.timer);

    let flows = [{ origin: 3, dest: 2, count: 10},
        { origin: 3, dest: 1, count: 10 },
    ];

   if (props.timer > 1000 ) {
       flows = [
           { origin: 3, dest: 1, count: 10 },

           { origin: 5, dest: 6, count: 10 },
           { origin: 4, dest: 6, count: 10 },

       ];
   }


    if (props.timer > 1300 ) {
        flows = [
            { origin: 1, dest: 6, count: 10 },

        ];
    }

   return new FlowMapLayer({
        ...props,
        id: 'my-flowmap-layer' ,
        locations:
        // either array of location areas or a GeoJSON feature collection
        data,
        flows:  flows,

        //animationTailLength: 1,
        animate: true,
        animationCurrentTime: props.timer,
        getAnimatedFlowLineStaggering: (f, { index }) => {
            return index;
        },
        getFlowMagnitude: (flow) => flow.count || 0,
        getFlowOriginId: (flow) => flow.origin,
        getFlowDestId: (flow) => flow.dest,
        getLocationId: (loc) => {
            // console.log(loc);
            return loc.properties.id},
        getLocationCentroid: (location) => [location.geometry.coordinates[0], location.geometry.coordinates[1]],
    })
}

export default GraphLayer;
