import React from 'react';
import moment from 'moment';

function TimerGadget() {
    return (
        <div className="card date">
            <span className="time">{moment().format('hh:mm')}</span>
            <span className="day">{moment().format('d MMM YYYY')}</span>
        </div>
    );
}

export default TimerGadget;
