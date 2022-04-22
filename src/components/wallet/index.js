import React  from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import WalletCard from "./WalletCard";
import WalletTransactionList from "./WalletTransactionList";
import {Grid} from "@mui/material";

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

const GET_WALLET = gql`
   query {
      getWallet(walletId : "fsdf") {
        balanceEuro
        balanceKWH
        transactions
      }
    }
`;

export default function AccountUsersQuery({ account }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>

                <Query
                    query={GET_WALLET}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch, loading }) => {

                        if (loading || !data) return null;

                        return (
                            <Grid container={true} justifyContent="space-between">

                                <Grid item={true} sm={5}>
                                    <WalletCard text='E' balance={data.getWallet.balanceEuro}/>
                                </Grid>

                                <Grid item={true} sm={2}></Grid>

                                <Grid item={true} sm={5}>
                                    <WalletCard text='KWH' balance={data.getWallet.balanceKWH}/>
                                </Grid>

                                <h2>Transactions</h2>

                                <WalletTransactionList transactions={data.getWallet.transactions}/>

                            </Grid>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}
