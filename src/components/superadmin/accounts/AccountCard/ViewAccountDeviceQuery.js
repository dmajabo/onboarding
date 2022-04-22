import React, { useContext, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Paper } from '@mui/material';
import Table from "@mui/material/Table";
import Input from "@mui/material/Input";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import ViewAccountDeviceAdd from './ViewAccountDeviceAdd'
import ViewAccountDeviceDelete from './ViewAccountDeviceDelete'
import ViewAccountDeviceEdit from './ViewAccountDeviceEdit'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop : '10px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ACCOUNT_DEVICES = gql`
    query($account_id : uuid!) {
        mapping_table(order_by : {id : asc},where: {account_id: {_eq: $account_id}}) {
            account_id
            active
            agent_id
            chain_user
            device_id
            device_address
            id
        }
    }
`;

export default function AccountDevicesQuery({ account }) {
    const classes = useStyles();

    const [error, setError] = useState(null);

    return (
        <div className={classes.root}>
            <div>
                <Query
                    query={ACCOUNT_DEVICES}
                    variables={{ account_id: account.id }}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch, loading }) => {

                        if (loading || !data) return null;

                        return (
                            <div>

                                <ViewAccountDeviceAdd setError={setError} account={account} refetch={refetch}/>

                                <br/>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} id={'testDevicesTable'}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{'width' : '250px'}}>Chain User</TableCell>
                                                <TableCell style={{'width' : '150px'}}>Device ID</TableCell>
                                                <TableCell style={{'width' : '150px'}}> Device address</TableCell>
                                                <TableCell style={{'width' : '150px'}}> Agent ID</TableCell>
                                                <TableCell> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.mapping_table.map((device) => {

                                                return (
                                                    <TableRow key={device.id}>

                                                        <TableCell component="td" scope="row">
                                                            <ViewAccountDeviceEdit refetch={refetch} setError={setError} device={device} mapping={'chain_user'}/>
                                                        </TableCell>

                                                        <TableCell component="td" scope="row">
                                                            <ViewAccountDeviceEdit refetch={refetch} setError={setError} device={device} mapping={'device_id'}/>
                                                        </TableCell>

                                                        <TableCell component="td" scope="row">
                                                            <ViewAccountDeviceEdit refetch={refetch} setError={setError} device={device} mapping={'device_address'}/>
                                                        </TableCell>

                                                        <TableCell component="td" scope="row">
                                                            <ViewAccountDeviceEdit refetch={refetch} setError={setError} device={device} mapping={'agent_id'}/>
                                                        </TableCell>

                                                        <TableCell component="td" scope="row">
                                                            <ViewAccountDeviceDelete refetch={refetch} setError={setError} device={device} refetch={refetch}/>
                                                        </TableCell>

                                                    </TableRow>
                                                )

                                            })}
                                        </TableBody>
                                    </Table>
                                    {(error && error.graphQLErrors.map(e => e.message))}
                                </TableContainer>
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}
