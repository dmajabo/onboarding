import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import JSONPretty from 'react-json-pretty';

var jsondiffpatch = require('jsondiffpatch').create({
    // used to match objects when diffing arrays, by default only === operator is used
    objectHash: function(obj) {
        // this function is used only to when objects are not equal by ref
        return obj._id || obj.id;
    },
    arrays: {
        // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
        detectMove: true,
        // default false, the value of items moved is not included in deltas
        includeValueOnMove: false
    },
    textDiff: {
        // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
        minLength: 60
    },

});

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

export default function Row(props) {
    const { row, refetch } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const diff = jsondiffpatch.diff({}, row.after_value);
    return (
        <React.Fragment>
            <TableRow className={classes.root}>

                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>

                    {row.operation}

                </TableCell>

                <TableCell>
                    {row.table_name}
                </TableCell>

            </TableRow>

            <TableRow>

                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} style={{paddingLeft : '80px'}}>

                            <JSONPretty id="json-pretty" data={row.after_value}></JSONPretty>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
