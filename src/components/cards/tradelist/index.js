import React, { Fragment, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box} from "@mui/material";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import BasicTable from "./Table";

export const background = '#584153';

const TRADELIST = gql`
    query {
      getTradeList {
        agentId
        executionId
        price
        ptuId
        sold
        status
        timestamp
        volume
      }
    }
`;

function TradeList() {

    return (
        <div>
            <Query
                query={TRADELIST}
                fetchPolicy={'network-only'}
            >
                {({ data, loading,  refetch }) => {

                    if (loading || !data) return null;

                    return (
                        <Fragment>

                            <Card>

                                <CardContent>

                                    <Box display="flex" flexDirection="column" alignItems="center">

                                        <BasicTable trades={data.getTradeList}/>
                                    </Box>

                                </CardContent>

                            </Card>

                        </Fragment>
                    );
                }}
            </Query>


        </div>
    );
}

export default TradeList;


