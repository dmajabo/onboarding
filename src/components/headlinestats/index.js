import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_CARDS = gql`
query MyQuery {
  card_table {
    data
    id
    user_id
    created_at
    type
  }
}

`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

                <Query query={GET_CARDS}>
                    {({loading, error, data, refetch}) => {

                        if (loading || !data) return null;

                        return <div>

                                <Grid container spacing={3}>

                                 <Grid item xs={3}>
                                        <Paper className={classes.paper}>
                                           123
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Paper className={classes.paper}>
                                            123
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Paper className={classes.paper}>
                                            123
                                        </Paper>
                                    </Grid>


                                    <Grid item xs={3}>
                                        <Paper className={classes.paper}>
                                            123
                                        </Paper>
                                    </Grid>

                                </Grid>

                        </div>
                    }
                    }
                </Query>




        </div>
    );
}
