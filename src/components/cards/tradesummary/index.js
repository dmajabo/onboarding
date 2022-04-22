import React, { Fragment, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box} from "@mui/material";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import BasicTable from "./Table";

export const background = '#584153';

const TRADESUMMARY   = gql`
   query {
      getTradeSummary {
        bought
        sold
      }
    }
`;

function TradeSummary() {

    return (
        <div>
            <Query
                query={TRADESUMMARY}
                fetchPolicy={'network-only'}
            >
                {({ data, loading,  refetch }) => {

                    if (loading || !data) return null;

                    return (
                        <Fragment>

                            <Card>
                                <CardContent>
                                    <Box display="flex" flexDirection="column" alignItems="center">

                                        <p>Bought {data.getTradeSummary.bought.count} at ${data.getTradeSummary.bought.price} </p>

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

export default TradeSummary;


