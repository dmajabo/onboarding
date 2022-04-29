import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import gql from 'graphql-tag';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Mutation } from 'react-apollo';
import { Form, Select } from 'antd';
import Typography from '@mui/material/Typography';

const UPDATE_ADDRESS_TYPE = gql`
    mutation($account_id: uuid, $type: String) {
        update_account_table(where: { id: { _eq: $account_id } }, _set: { type: $type }) {
            returning {
                id
            }
        }
    }
`;

const useStyles = makeStyles(theme => ({
    formControl: {
        marginBottom: theme.spacing(2),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function AccountType({ account, refetch }) {
    const classes = useStyles();

    return (
        <div>
            <Mutation mutation={UPDATE_ADDRESS_TYPE} onError={() => {}} onCompleted={() => refetch()}>
                {(MyMutation, { loading, error }) => {
                    // if (loading) return null

                    //if (error && error.graphQLErrors[0].extensions.code ==='validation-failed') return <Alert severity="error">Not Allowed to change site</Alert>
                    return (
                        <Form size="large" className={classes.formControl}>
                            <Form.Item
                                label={<Typography style={{ color: 'white', fontSize: 16 }}>Type</Typography>}
                                // labelCol={{ span: 6, offset: 6 }}
                            >
                                <Select
                                    value={account.type}
                                    onChange={e =>
                                        MyMutation({ variables: { account_id: account.id, type: e.target.value } })
                                    }
                                >
                                    <MenuItem value={'Residential'}>Residential</MenuItem>
                                    <MenuItem value={'Commercial'}>Commercial</MenuItem>
                                </Select>
                            </Form.Item>
                        </Form>
                    );
                    return (
                        <FormControl className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={account.type}
                                onChange={e =>
                                    MyMutation({ variables: { account_id: account.id, type: e.target.value } })
                                }
                            >
                                <MenuItem value={'Residential'}>Residential</MenuItem>
                                <MenuItem value={'Commercial'}>Commercial</MenuItem>
                            </Select>
                        </FormControl>
                    );
                }}
            </Mutation>
        </div>
    );
}
