import React, { useContext, useState, Fragment } from 'react';
import { UserContext } from './../../providers/UserProvider';
import SelectedAccountDetails from './SelectedAccountDetails'
import AddAccount from './AddAccount'
import AccountCard from './AccountCard'
import Grid from '@mui/material/Grid';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {AccountContext} from "../../providers/AccountProvider";

const ACCOUNTS = gql`
    query 
        {
          account_table(where: {deployment_id: {_is_null: false}}, order_by : {created_at : asc}) {
            id
            name
            type
            viewstate
            buildingType
            businessType
            buildingSiteAttributes
            tenant_type
            number_tenants
            tenant_period
            typical_working_hours
            energy_supplier_id
            occupants
            
            consumption_trend
            expected_electricification
            owner_type
            
            usage {
              day
              peak_usage_hour_from
              peak_usage_hour_to
            }
            
            wallet_id
            mrp_id
            dso_id
            geojson
            
            energy_supplier_id
            energy_supplier {
                id
                name
            }
             addresses {
              line1
              line2
              line3
              city
              country
              postcode
              type
              id
            }
            
              files {
                field
                id
            }
           
          }
        }
`;

const AccountsPage = () => {

    const { user } = useContext(UserContext);

    const [selectedAccount, setSelectedAccount] = useState(null);

    if (!user) return null;

    return (
        <div>

            <Query
                    query={ACCOUNTS}
                    fetchPolicy={'network-only'}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch }) => {
                        return (
                            <Fragment>

                                <h1>Account Administration</h1>

                                <AddAccount setSelectedAccount={setSelectedAccount} refetch={refetch} deploymentId={process.env.REACT_APP_DEPLOYMENT_ID}/>

                                <Grid container spacing={3}>
                                    {data && data.account_table.map((account) => {

                                        ///return <div> { JSON.stringify(account)}</div>
                                        return  <Grid item xs={6} key={account.id}>
                                                    <AccountCard refetch={refetch} account={account} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount}/>
                                                </Grid>
                                    })}

                                </Grid>
                            </Fragment>
                        );
                    }}
                </Query>

        </div>
    );
};

export default AccountsPage;
