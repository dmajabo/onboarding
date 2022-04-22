import React, {Fragment, useContext, useState} from 'react';
import FormsHolder from '../../components/forms';
import { Paper } from '@mui/material';
import {AccountContext} from "../../components/providers/AccountProvider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {UserContext} from "../../components/providers/UserProvider";

const Forms = () => {

    //if a account-user or account-admin is logged in, the account is in the context.
    const { account, refetch } = useContext(AccountContext);
    const [showDialog, setShowDialog] = useState(true);

    const { user } = useContext(UserContext);

    if (!user || !account) return <pre>Loading</pre>

    return (
        <Fragment>

            <Dialog open={showDialog}  aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title"> Onboarding</DialogTitle>
                <DialogContent>

                    You are about to access the onboarding tool for {account?.name}.

                    <p>Please ensure you are authorized to submit this data on behalf of your organization. All fields in the forms are auto-saved. Email us at support@distroenergy.com if you need help. </p>

                    <div style={{textAlign : 'center'}}>
                        <Button  id='testAgreeOnboarding' color="primary" variant={'contained'} onClick={() => setShowDialog(false)}>
                            I agree
                        </Button>
                    </div>
                </DialogContent>

                <DialogActions>


                </DialogActions>
            </Dialog>

            <Paper style={{padding : '20px'}}>
                {account && <FormsHolder account={account} refetch={refetch}/> }
            </Paper>
        </Fragment>

);
};

export default Forms;
