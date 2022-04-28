import React from 'react';

function LineGadget({ value, total }) {
    return (
        <div className="stats">
            <div className="icon icon-chart" />
            <p>
                {value}/<span>{total}</span>
            </p>
        </div>
    );
}

export default LineGadget;
