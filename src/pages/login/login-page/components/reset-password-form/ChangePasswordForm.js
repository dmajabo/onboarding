import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Button, Box, Typography } from '@mui/material';
import Loading from 'components/loading/Loading';

const ChangePasswordForm = ({user}) => {
    const history                       = useHistory();
    const [submitting, setSubmitting]   = useState(false);
    const [error, setError]             = useState(null);

    // Send confirmation code to user's email
    useEffect(() => {
        if (true) Auth.forgotPassword(user);
       // alert("this should happen just once")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResetPassword = async (values) => {

            setError(null);
            setSubmitting(true);

            Auth.forgotPasswordSubmit(user, values.code, values.password)
                .then( (data) => {
                      return Auth.signIn(user, values.password);
                })
                .then(data => {
                    history.push('/terms'); //terms page will forward user on to the right place
                })
                .catch((e) => {
                    //alert('error')
                    setError(e);
                    setSubmitting(false);
            })
    };

    return (
        <Formik
            initialValues={{
                code : '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                code: Yup.string().required().min(2),
                password: Yup.string().required().min(2),
            })}
            onSubmit={(values) => {
                handleResetPassword(values);
            }}
        >
            {({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
              }) => (
                <form onSubmit={handleSubmit}>

                    <Box width="100%" maxWidth="400px" margin="auto">

                        <Box marginTop={3}>

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Enter the code we have emailed"
                                fullWidth={true}
                                value={values.code}
                                onChange={handleChange('code')}
                                onBlur={handleBlur('code')}
                            />

                            <TextField
                                type="password"
                                variant="outlined"
                                placeholder="Enter your new password here"
                                fullWidth={true}
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                        </Box>
                        {error && (
                            <Box marginTop={3}>
                                <Typography variant="caption" color="error">
                                    {error.message}
                                </Typography>
                            </Box>
                        )}
                        <Box marginTop={11}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth={true}
                                disabled={!isValid || submitting}
                            >
                                Change password
                            </Button>
                        </Box>
                    </Box>

                    {submitting && (
                        <Loading />
                    )}
                </form>
            )}
        </Formik>
    );
};

export default ChangePasswordForm;
