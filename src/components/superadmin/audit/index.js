import React, { useContext, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AuditList from './AuditList';
const useStyles = makeStyles(theme => ({}));

const GET_AUDITS = gql`
    query($table_name: audit_log_bool_exp) {
        audit_log(where: $table_name) {
            before_value
            after_value
            table_name
            operation
        }

        tables: audit_log(distinct_on: table_name) {
            table_name
        }
    }
`;

export default function AuditQuery({}) {
    const classes = useStyles();

    const [table, setTable] = useState('null');

    return (
        <div className={classes.root}>
            <div>
                <Query
                    query={GET_AUDITS}
                    fetchPolicy={'network-only'}
                    variables={{
                        table_name:
                            table !== 'null' ? { table_name: { _eq: table } } : { table_name: { _is_null: false } }
                    }}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch, loading }) => {
                        if (loading || !data) return null;

                        return (
                            <div>
                                <FormControl fullWidth={true} margin="dense" size="small">
                                    <InputLabel shrink={true}>Table</InputLabel>
                                    <Select
                                        input={<OutlinedInput notched={true} label="Table" />}
                                        value={table}
                                        onChange={e => setTable(e.target.value)}
                                    >
                                        {data.tables.map(s => (
                                            <MenuItem key={s} value={s.table_name}>
                                                {s.table_name}{' '}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <AuditList audits={data.audit_log} />
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}
