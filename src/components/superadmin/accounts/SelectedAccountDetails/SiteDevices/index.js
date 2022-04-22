import React, {Fragment} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import Checkbox from '@mui/material/Checkbox';
import withStyles from '@mui/styles/withStyles';
import { green } from '@mui/material/colors';
import { Alert } from '@mui/material';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DeviceList({loggedinuser, devices, refetch}) {
    const classes = useStyles();

    if (devices.length ===0) return <Alert severity="warning">no devices. </Alert>

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{'width' : '250px'}}>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devices.map((device) => {

                        return (
                            <TableRow key={device.id}>
                                <TableCell component="th" scope="row">
                                    {device.id}
                                </TableCell>
                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
