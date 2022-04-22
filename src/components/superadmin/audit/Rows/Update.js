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
import rdiff from 'recursive-diff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getDiff, applyDiff, rdiffResult } from 'recursive-diff';
import _ from 'lodash';

///import jsondiffpatch from 'jsondiffpatch';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
//var jsondiffpatch = require('jsondiffpatch').create({});

const oldCode = `
{
  "name": "Original name",
  "description": null
}
`;
const newCode = `
{
  "name": "My updated name",
  "description": "Brand new description",
  "status": "running"
}
`;

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

    const diff = getDiff(row.before_value,row.after_value);

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
                        <Box margin={1} style={{paddingLeft : '80px' }}>

                            {row.table_name} :
                            {row.before_value.id} :

                          <ul> {diff.map(d => {
                              const oldVal = _.get(row.before_value, d.path.join('.'), '');
                              const newVal = _.get(row.after_value, d.path.join('.'), '');
                               console.log(newVal);
                              return <li> <strong>{d.path.join('.')} </strong> : {oldVal} ->  {newVal ===  true ? 'true' : newVal} </li>
                          })} </ul>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
