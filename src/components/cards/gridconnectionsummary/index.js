import React, { useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from '@mui/material/Typography';
import {   green } from '@mui/material/colors';
import _ from 'lodash';
import Chart from './chart'
import {Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {

    },


    listItem : {
        listStyle : 'none'
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        fontSize : '10px',
        textAlign : 'center',
        color : 'grey',
        backgroundColor: green[500],
    },
}));

export default function GridConnectionCard() {
    const classes = useStyles();
    const [filteredStock, setFilteredStock] = useState([]);


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                   <img style={{width: '80px'}} alt=" " src={'/logo.png'}/>
                }
                action={
                [
                    <Chip label="online" variant="outlined" size="small" icon={ <FiberManualRecordIcon style={{color : 'green'}}/>} />

                ]
                }
                title={<span>Grid Connection Summary </span>}
            />

            <CardContent>

                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body" color="textSecondary" component="h1" >
                        {_.sumBy(filteredStock, x => x.close).toFixed(2)} kwh
                    </Typography>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="left">
                    <ul>
                        <li className={classes.listItem}>
                            EAN 1
                        </li>

                        <li className={classes.listItem}>
                            EAN 2
                        </li>

                    </ul>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center">
                    <Chart width={800} height={200} filteredStock={filteredStock} setFilteredStock={setFilteredStock}/>
                </Box>

            </CardContent>

        </Card>
    );
}
