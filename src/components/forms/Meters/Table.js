import React from 'react';
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
import AddMeter from "../Grid/GridConnection/AddMeter";

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
                    <IconButton className='testExpandMeterTable' aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.description}
                </TableCell>
                <TableCell align="right">{row.ean_number}</TableCell>
                <TableCell align="right">{row.meter_number}</TableCell>
                <TableCell align="right">{row.max_kwh}</TableCell>
                <TableCell align="right">{row.historical_kwh}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} style={{paddingLeft : '80px'}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sub-Meters
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Meter ID </TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                   <AddMeter supply_point={row} refetch={refetch}/>


                                    {row.meters.map(meter => <TableRow key={meter.id}>
                                        <TableCell>{meter.meter_number} </TableCell>
                                        <TableCell>{meter.description}</TableCell>
                                    </TableRow>)}

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({refetch, supplypoints}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" id={'testMeterTable'}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Description</TableCell>
                        <TableCell align="right">EAN </TableCell>
                        <TableCell align="right">Head Meter </TableCell>
                        <TableCell align="right">Max Kwh </TableCell>
                        <TableCell align="right">Historical KWH</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {supplypoints.map((row) => (
                        <Row key={row.id} row={row} refetch={refetch}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
