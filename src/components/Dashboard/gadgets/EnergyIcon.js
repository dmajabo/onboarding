import React from 'react';

function EnergyGadget({ value }) {
    return (
        <div className="stats">
            <div className="icon icon-battery" />
            <p>{value}</p>
        </div>
    );
}

export default EnergyGadget;
