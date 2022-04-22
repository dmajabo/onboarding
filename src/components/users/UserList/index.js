import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import AdminToggle from '../AdminToggle';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function UserList({loggedinuser, users, refetch}) {
    const classes = useStyles();

   // return <pre>{JSON.stringify(users)}</pre>
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{'width' : '350px'}}>Email</TableCell>
                        <TableCell align="left">Admin</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {

                        const userMustChangePassword = user.UserStatus === 'FORCE_CHANGE_PASSWORD';

                        return (
                            <TableRow key={user.id}>

                                <TableCell component="th" scope="row">
                                    {user.UserName || user.id}

                                    {userMustChangePassword && (
                                        <LockIcon style={{ color: 'orange' }} />
                                    )}

                                </TableCell>

                                <TableCell align="left">

                                    <AdminToggle
                                        user={user}
                                        loggedinuser={loggedinuser}
                                        refetch={refetch}
                                    />

                                </TableCell>

                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
