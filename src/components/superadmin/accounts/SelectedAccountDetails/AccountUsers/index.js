import React, {Fragment} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import Checkbox from '@mui/material/Checkbox';
import withStyles from '@mui/styles/withStyles';
import { green } from '@mui/material/colors';
import { Alert } from '@mui/material';

import DeleteCognitoUser from "../../../../users/DeleteUser";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const CompletedCheckBox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox checked={true} color="default" {...props} />);

const FormsToCompleteSummary = withStyles({
    root: {
      // marginRight : '10px'
    },
    checked: {},
})((props) => {

    return <Fragment>

        {props.forms.filter(f => f.status === 'NEW').map(f => <Chip
            key={f.id}
            style={{marginRight : '10px'}}
            variant="outlined"
            size="small"
            avatar={<AssignmentLateTwoToneIcon style={{color : 'red'}}/>}
            label={f.type}
        />)}

    </Fragment>
}
);





export default function UserList({loggedinuser, users, refetch}) {
    const classes = useStyles();

    if (users.length ===0) return <Alert severity="warning">no users defined. </Alert>

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" id={'testUserTable'}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{'width' : '250px'}}>Email</TableCell>
                        <TableCell style={{'width' : '150px'}}>T &C Agreed</TableCell>
                        <TableCell style={{'width' : '150px'}}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {

                       // let formsCompleted = user.forms.filter(f => f.status === 'NEW').length ===0;

                        return (
                            <TableRow key={user.name}>
                                <TableCell component="th" scope="row">
                                    {user.UserName || user.id}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {user.role.termsAgreed && <CheckCircleRoundedIcon/>}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <DeleteCognitoUser user={user} refetch={refetch}/>
                                </TableCell>

                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
