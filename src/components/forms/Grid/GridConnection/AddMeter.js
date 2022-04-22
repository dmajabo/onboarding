import React, {Fragment } from 'react';
import { Button,  TextField} from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const ADD_METER = gql`

mutation($supply_point_id : uuid, $description : String, $meter_number : String) {
  insert_meter_table_one(object: {description: $description, meter_number: $meter_number, supply_point_id: $supply_point_id}) {
    id
  }
}

`;

export default function AddMeter({ supply_point, refetch }) {

    const [error, setError]                                 = React.useState("");
    const [description, setDescription]                     = React.useState("");
    const [meterNumber, setMeterNumber]                     = React.useState("");

    return (
        <Mutation
            mutation={ADD_METER}
            onCompleted={(e) => {
                refetch && refetch();
                setMeterNumber('');
                setDescription('');
            }}
            variables={{ supply_point_id : supply_point.id, description, meter_number : meterNumber }}
            onError={(e) => {
                setError(error);
            }}
        >
            {(MyMutation, { loading, error }) => {

                return (
                    <Fragment>

                        <TableRow key={1}>
                            <TableCell component="td" scope="row">
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    margin="dense"
                                    size={'small'}
                                    id={'testMeterNumberInput'}
                                    fullWidth={true}
                                    style={{width : '120px'}}
                                    InputLabelProps={{ shrink: true }}
                                    value={meterNumber}
                                    onChange={(e) => setMeterNumber(e.target.value)}
                                />
                            </TableCell>

                            <TableCell component="td" scope="row">
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    margin="dense"
                                    size={'small'}
                                    id={'testMeterDescriptionInput'}
                                    fullWidth={true}
                                    style={{width : '120px'}}
                                    InputLabelProps={{ shrink: true }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <Button id='testAddMeter' variant={'outlined'} onClick={() => MyMutation()}> Add </Button>
                            </TableCell>
                        </TableRow>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
