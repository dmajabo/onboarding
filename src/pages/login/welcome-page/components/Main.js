import React from 'react';
import { Button } from 'antd';
import Grid from '@mui/material/Grid';

function Main({ logo, title, onSignin, onSignup }) {
    return (
        <Grid
            container
            direction={'column'}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            className={'main'}
        >
            <Grid item>
                <img src={logo} />
            </Grid>
            <Grid item>
                <h2 className="heading">{title}</h2>
            </Grid>
            <Grid item>
                <Grid container gap={3}>
                    <Button type="primary" size={'large'} onClick={onSignup}>
                        Sign Up
                    </Button>
                    <Button type={'default'} size={'large'} onClick={onSignin}>
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Main;
