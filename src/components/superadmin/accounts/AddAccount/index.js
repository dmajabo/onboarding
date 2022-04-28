import React, { Fragment, useState } from 'react';
import { Input, Checkbox } from '@mui/material';
import { Button } from 'antd'
import Alert from '@mui/material/Alert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_ACCOUNT = gql`
    mutation MyMutation($deployment_id : String!) {
      insert_account_table_one(object: {name: "New Account", 
      deployment_id : $deployment_id,
      viewstate : {zoom:0,pitch:0,bearing:0,maxZoom:20,minZoom:0,altitude:1.5,latitude:51.89859845841297,maxPitch:60,minPitch:0,longitude:4.424517714620209},
      type: "Commercial",  
      
        usage: {data: [   #join table
        {day: "monday"},
        {day: "tuesday"},
        {day: "wednesday"},
        {day: "thursday"},
        {day: "friday"},
        {day: "saturday"},
        {day: "sunday"},
      ]}
     
      addresses: {data: [   #join table
        {type: "Invoicing", line1 : "", line2 : ""},
        {type: "Main Site",      line1 : "", line2 : ""},
      ]}
         
         }) {
        id
      }
    }
`;

export default function AddAccount({ setSelectedAccount, refetch, deploymentId }) {

    return (
        <Mutation
            mutation={ADD_ACCOUNT}
            variables={{deployment_id : deploymentId}}
            onCompleted={(e) => {
                refetch && refetch();
                setSelectedAccount(null);
            }}
            onError={(e) => {
                alert(e);
            }}
        >
            {(MyMutation, { loading, error }) => {
                //if (loading) return null;

                return (
                    <Fragment>

                        <Button
                            variant={'outlined'}
                            size={'large'}
                            type={'primary'}
                            style={{marginBottom : '5px'}}
                            id={'addAccount'}
                            onClick={() => {
                                MyMutation();
                            }}
                        >
                            Add Account
                        </Button>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
