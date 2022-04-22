import React, {Fragment, useState} from 'react'
import {Button} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MuiDialog from '@mui/material/Dialog';
import FormikTextField from "../formik-fields/FormikTextField";
import FormikNumberField from "../formik-fields/FormikNumberField";
import {Formik} from "formik";
import * as Yup from "yup";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import MeterSelect from "./MeterSelect";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const INSERT = gql`
    mutation ($object : asset_chargingpoint_table_insert_input!) {
      insert_asset_chargingpoint_table_one(object: $object) {
        id
      }
    }
`;

const Dialog = withStyles((theme) => ({
    paper: {
        padding : '20px',
        height: '50%'
    },
}))(MuiDialog);

const AddChargingSite = ({ account, refetch, disabled}) => {

    const [meter, setSelectedMeter] = useState(null);
    const [open, setOpen]           = useState(false);

    return (
        <Fragment>

            <Mutation
                mutation={INSERT}
                onCompleted={() => {setOpen(false); refetch()}}
                onError={(e) => {
                    console.log(e)
                }}
            >
                {(handleMutation, { loading, error }) => (
                <Formik
                    initialValues={{}}
                    validationSchema={Yup.object().shape({
                        name:               Yup.string().required('Field must be entered'),
                        number:     Yup.string().required('Field must be entered'),
                    })}
                    enableReinitialize={true}
                    isInitialValid={false}
                >
                    {({values, resetForm, isValid}) =>
                        <Dialog open={open} fullWidth maxWidth="sm" >

                            <DialogTitle id="id">
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1} >Add new Charging Site</Box>
                                    <Box>
                                        <IconButton onClick={() => setOpen(false)} size="large">
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </DialogTitle>


                                <MeterSelect account={account} meter={meter} setSelectedMeter={setSelectedMeter}/>

                                <FormikTextField name="name" label="Charging Site Name" />

                                <FormikNumberField min={0} max={9999} name="number" label="Number of charging sites" />

                                <Button
                                    disabled={!isValid || !meter}
                                    fullWidth={true} variant={"contained"} onClick={() => {
                                   handleMutation({variables : {object : {meter_id : meter.id, account_id : account.id, ...values}}}).then(() => {
                                       resetForm();
                                       setSelectedMeter(null);
                                   });

                                }}>Add </Button>

                        </Dialog>}

                </Formik>
                    )}
            </Mutation>


            <Button disabled={disabled} variant={'outlined'} onClick={() => setOpen(true)}>Add </Button>

        </Fragment>
    );
}

export default AddChargingSite;
