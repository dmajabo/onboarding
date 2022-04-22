import React, { useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';
import _ from 'lodash';
import Chart from './chart'
import moment from 'moment';
import {Box} from "@mui/material";
import Chip from "@mui/material/Chip";

const useStyles = makeStyles((theme) => ({
    root: {

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
        backgroundColor: yellow[500],
    },
}));

export default function SolarSummaryCard() {
    const classes = useStyles();
    const [filteredStock, setFilteredStock] = useState([]);

    const subHeadingFrom = _.minBy(filteredStock, x => x.date);
    const subHeadingTo = _.maxBy(filteredStock, x => x.date);

    let subheadingFromText = subHeadingFrom ? moment(subHeadingFrom.date).format('DD MMM YYYY') : '';
    let subheadingToText   = subHeadingTo   ? moment(subHeadingTo.date).format('DD MMM YYYY') : '';
    let subheading         = subheadingFromText + " - " + subheadingToText;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        26 panels
                    </Avatar>
                }
                action={
                [
                    <Chip label="online" variant="outlined" size="small" icon={ <FiberManualRecordIcon style={{color : 'green'}}/>} />
                ]
                }
                title={<span>Solar Summary </span>}
                subheader={subheading}
            />

            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body" color="textSecondary" component="h1" >
                        {_.sumBy(filteredStock, x => x.close).toFixed(2)} kwh
                    </Typography>
                    <Chart width={800} height={200} filteredStock={filteredStock} setFilteredStock={setFilteredStock}/>

                </Box>

            </CardContent>

        </Card>
    );
}
