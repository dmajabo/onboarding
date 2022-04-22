import React from 'react';
import { Modal, CircularProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    modal: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progress: {
        color: '#fff',
        outline: 'none'
    }
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <Modal// `disableBackdropClick` is removed by codemod.
// You can find more details about this breaking change in [the migration guide](https://mui.com/guides/migration-v4/#modal)
 className={classes.modal} open={true} disableAutoFocus={true}>
            <CircularProgress className={classes.progress} />
        </Modal>
    );
};

export default Loading;
