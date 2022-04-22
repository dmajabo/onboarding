import React, {useState, Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ViewAccountWalletQuery from "./ViewAccountWalletQuery";
import ViewAccountWalletEdit from "./ViewAccountWalletEdit";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormikTextField from "../../../forms/formik-fields/FormikTextField";

export default function ViewAccountWallet({account, refetch}) {
    const [open,        setOpen]       = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>

            <Button size={'small'} variant="text" color="primary" onClick={handleClickOpen}>
                 Wallet
            </Button>

            <Dialog

                open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="id">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} >{account.name} Wallet</Box>
                        <Box>
                            <IconButton onClick={handleClose} size="large">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>

                    <ViewAccountWalletEdit account={account} refetch={refetch}/>
                    {account.wallet_id  && <ViewAccountWalletQuery account={account}/>}

                </DialogContent>

                <DialogActions>

                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
