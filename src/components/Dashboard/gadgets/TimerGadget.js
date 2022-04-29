import React, { useState } from 'react';
import moment from 'moment';
import useInterval from 'hooks/useInterval';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function TimerGadget() {
    const [date, setdate] = useState();

    useInterval(() => {
        setdate(new Date());
    }, 1000);

    return (
        <Stack direction={'row'} className={'date'}>
            <span className="time">{moment(date).format('hh:mm')}</span>
            <span className="day">{moment(date).format('d MMM YYYY')}</span>
        </Stack>
    );
}

export default TimerGadget;
