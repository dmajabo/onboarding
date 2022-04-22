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
import PictureAsPdf from '@mui/icons-material/GetApp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row, refetch } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id} <PictureAsPdf/>
                </TableCell>
                <TableCell align="right">Jan - Feb</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} style={{paddingLeft : '80px'}}>

                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Qty </TableCell>
                                        <TableCell align="right">Amount </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow className={classes.root}>

                                        <TableCell align="right">100 units @ 0.1234</TableCell>
                                        <TableCell align="right">12</TableCell>
                                    </TableRow>

                                    <TableRow className={classes.root}>
                                        <TableCell align="right">30 units @ 0.3421</TableCell>
                                        <TableCell align="right">4</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const fakeInvoices = [
    {id  : 'INV000001', invoice_from : '', invoice_to : '', amount : 16, status : 'Paid', }
]
export default function InvoiceList({refetch, supplypoints}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Invoice Number</TableCell>
                        <TableCell align="right">Invoice Period  </TableCell>
                        <TableCell align="right">Amount </TableCell>
                        <TableCell align="right">Status </TableCell>
                        <TableCell align="right"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {fakeInvoices.map((row) => (
                        <Row key={row} row={row} refetch={refetch}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
