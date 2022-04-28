import React, { useState } from 'react';
import moment from 'moment';
import useInterval from 'hooks/useInterval';

function TimerGadget() {
    const [date, setdate] = useState();

    useInterval(() => {
        setdate(new Date());
    }, 1000);
    return (
        <div className="card date">
            <span className="time">{moment(date).format('hh:mm')}</span>
            <span className="day">{moment(date).format('d MMM YYYY')}</span>
        </div>
    );
}

export default TimerGadget;
