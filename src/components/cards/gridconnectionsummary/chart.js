import React from 'react';

import AreaChart from './AreaChart';

export const background = '#584153';

function BrushChart({
    compact = false,
    width,
    height,
    margin = {
        top: 20,
        left: 50,
        bottom: 20,
        right: 20
    },

    filteredStock,
    setFilteredStock
}) {
    return (
        <div>
            <AreaChart width={800} height={100} />
        </div>
    );
}

export default BrushChart;
