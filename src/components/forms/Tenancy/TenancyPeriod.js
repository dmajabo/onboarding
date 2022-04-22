import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { TextField } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_TENANCY_PERIOD = gql`
    mutation MyMutation($id: uuid!, $tenant_period: Int) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { tenant_period: $tenant_period }) {
            id
        }
    }
`;

const TenancyPeriod = ({ account, refetch }) => {
    const [tenantPeriod, seTenantPeriod] = useState(account.tenant_period);

    return (
        <Mutation
            mutation={UPDATE_TENANCY_PERIOD}
            onCompleted={e => {
                refetch && refetch();
            }}
            onError={e => {
                alert(JSON.stringify(e));
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <TextField
                        label="Tenancy Period (months)"
                        type={'number'}
                        size={'small'}
                        variant={'outlined'}
                        fullWidth={true}
                        min={0}
                        margin="dense"
                        value={tenantPeriod}
                        onBlur={e => MyMutation({ variables: { id: account.id, tenant_period: +e.target.value } })}
                        onChange={e => seTenantPeriod(e.target.value)}
                    />
                );
            }}
        </Mutation>
    );
};

export default TenancyPeriod;
