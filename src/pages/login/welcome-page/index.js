import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import StatsCard from './components/StatsCard';
import Main from './components/Main';

const Home = () => {
    const history = useHistory();

    return (
        <>
            <Main
                logo={'/logo-main.png'}
                title={'has arrived in the port of Rotterdam'}
                onSignin={() => history.push('/login')}
                onSignup={() => history.push('/register')}
            />
            <Grid container>
                <Grid direction={'column'} justifyContent={'center'}>
                    <StatsCard>
                        60 units <span>over</span> 3 qs km
                    </StatsCard>
                    <StatsCard>
                        100 kw <span>generated</span>
                    </StatsCard>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
