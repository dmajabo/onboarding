import React, {useState, Fragment} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ViewAccountUsersQuery from "./ViewAccountUsersQuery";
import NewForms from "../../../forms/";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import withStyles from '@mui/styles/withStyles';
import MuiDialog from "@mui/material/Dialog";

const Dialog = withStyles((theme) => ({
    paper: {
        padding : '20px',
        height: '80%' // 100% is for full height or anything else what you need
    },
}))(MuiDialog);

const SmallDialog = withStyles((theme) => ({
    paper: {
        padding : '20px',
        zIndex: '7 !important',
        height: '30%' // 100% is for full height or anything else what you need
    },
}))(MuiDialog);

export default function ViewAccountOnboarding({account, refetch}) {

    const [open,        setOpen]       = useState(false);
    const [alert,    setAlert]         = useState(false); //0 = disabled, 1 = show dialog, 2 = not disabled
    const [disabled,    setDisabled]   = useState(true); //0 = disabled, 1 = show dialog, 2 = not disabled

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
    };

    return (
        <Fragment>

            <Button size={'small'} variant="text" color="primary" onClick={handleClickOpen}>
                 Onboarding
            </Button>

            <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="id">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} >
                            {account.name}

                            {disabled && <Button style={{marginLeft : '10px'}} size={'small'} variant="outlined" color="primary" onClick={() => setAlert(true)}>
                                Unlock
                            </Button> }

                        </Box>
                        <Box>
                            <IconButton onClick={handleClose} size="large">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>


                <DialogContent>
                   <NewForms account={account} refetch={refetch} disabled={disabled}/>
                </DialogContent>

            </Dialog>

            <SmallDialog  open={alert} maxWidth="sm" onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>
                    <p>
                        You are about to access onboarding tool for {account.name}.

                        Please ensure you are authorized to submit this data on behalf of the organization.

                        All fields in the forms are auto-saved.
                    </p>

                    <p>Reach out to the support team at support@distroenergy.com if you need help.</p>

                </DialogContent>

                <DialogActions>
                    <Button variant={'contained'} onClick={() => {
                        setAlert(false);
                        setDisabled(false)}}>Agree</Button>
                </DialogActions>

            </SmallDialog>

        </Fragment>
    );
}
