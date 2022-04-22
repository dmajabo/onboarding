import React, {Fragment, useState} from 'react'
import {Button, Grid} from "@mui/material";
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
    mutation ($object : asset_solar_table_insert_input!) {
      insert_asset_solar_table_one(object: $object) {
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

export default ({ account, refetch, disabled}) => {

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
                        capacity:   Yup.string().required('Field must be entered'),
                    })}
                    enableReinitialize={true}
                    isInitialValid={false}
                >
                    {({values, resetForm, isValid}) =>
                        <Dialog open={open} fullWidth maxWidth="md" >

                            <DialogTitle id="id">
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1} >Add new Solar Plant</Box>
                                    <Box>
                                        <IconButton onClick={() => setOpen(false)} size="large">
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </DialogTitle>

                            <Grid container spacing={3}>

                                <Grid item xs={6}>
                                    <MeterSelect account={account} meter={meter} setSelectedMeter={setSelectedMeter}/>
                                    <FormikTextField name="name" label="Solar Plant Name" />

                                    <FormikNumberField min={0} max={9999} name="number" label="Number of panels" />

                                    <FormikNumberField  min={0} max={99999} name="capacity" label="Peak capacity per panel (kWp)" />

                                    <FormikNumberField  min={-180} max={180} name="longitude" label="Longitude" />

                                    <FormikNumberField  min={-90} max={90} name="latitude" label="Latitude" />



                                </Grid>

                                <Grid item xs={6}>
                                    <FormikNumberField min={0} max={9999} name="numberInverters" label="Number of inverters" />

                                    <FormikNumberField  min={0} max={99999} name="inverterCapacity" label="Inverter Capacity" />

                                    <FormikTextField name="orientation" label="Orientation" />

                                    <FormikNumberField min={0} max={90} name="angle" label="Angle Of Inclination" />

                                    <FormikNumberField min={0} max={25} name="yearOfInstallation" label="Year of Installation" />

                                    <FormikNumberField min={0} max={25} name="yearlyDegradation" label="Yearly Degradation" />

                                    <FormikTextField name="roofColor" label="Roof Color" />

                                </Grid>
                            </Grid>


                                <Button
                                    disabled={!isValid || !meter}
                                    className='addAsset'
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
