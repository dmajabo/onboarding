import React, {useState, Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ViewAccountDeviceQuery from "./ViewAccountDeviceQuery";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ViewAccountDevices({account, refetch}) {
    const [open,        setOpen]       = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>

            <Button id='testAccountDevices' size={'small'} variant="text" color="primary" onClick={handleClickOpen}>
                 Mappings
            </Button>

            <Dialog
                maxWidth="md"
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="id">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} >{account.name} Mappings</Box>
                        <Box>
                            <IconButton onClick={handleClose} size="large">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <ViewAccountDeviceQuery account={account}/>
                </DialogContent>

            </Dialog>
        </Fragment>
    );
}
