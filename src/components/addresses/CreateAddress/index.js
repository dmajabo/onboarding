import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import SaveAddress from "./SaveAddress";

export default function AddressDialog({address, refetch}) {
    const [open,        setOpen]       = useState(false);
    const [line1,       setLine1]      = useState(address.line1    || '');
    const [line2,       setLine2]      = useState(address.line2    || '');
    const [line3,       setLine3]      = useState(address.line3    || '');
    const [city,        setCity]       = useState(address.city     || '');
    const [postcode,    setPostcode]   = useState(address.postcode || '');
    const [country,     setCountry]    = useState(address.country  || '');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <span>
                <strong style={{display: 'inline-block', width : '150px'}}> {address.type} Address: </strong>

            <span style={{display: 'inline-block', width : '50px', textAlign: 'right'}}></span>
                <Button className='testEditAddress' style={{marginRight : '10px'}} size={'small'} variant="text" color="primary" onClick={handleClickOpen}>
                    Edit
                </Button>
                {line1}


            </span>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{address.type} Address</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="line1"
                        label="Line 1"
                        type="text"
                        fullWidth
                        onChange={(e) => setLine1(e.target.value)}
                        value={line1}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="line2"
                        label="Line 2"
                        type="text"
                        fullWidth
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="line3"
                        label="Line 3"
                        type="text"
                        fullWidth
                        value={line3}
                        onChange={(e) => setLine3(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="City"
                        type="text"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="postcode"
                        label="Post Code"
                        type="text"
                        fullWidth
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />

                    <Select
                        labelId="demo-simple-select-label"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <MenuItem value={'Netherlands'}>Netherlands</MenuItem>
                        <MenuItem value={'USA'}>USA</MenuItem>
                        <MenuItem value={'United Kingdom'}>United Kingdom</MenuItem>

                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <SaveAddress id={address.id}
                                 line1={line1}
                                 line2={line2}
                                 line3={line3}
                                 country={country}
                                 postcode={postcode}
                                 city={city}
                                 refetch={refetch}
                                 handleClose={handleClose} />

                </DialogActions>
            </Dialog>
        </div>
    );
}
