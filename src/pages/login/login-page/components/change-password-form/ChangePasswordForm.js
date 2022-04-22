import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Auth } from 'aws-amplify';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Button, Box, Typography } from '@mui/material';
import Loading from 'components/loading/Loading';

const ChangePasswordForm = ({changePassword, user}) => {
    const history                       = useHistory();
    const [submitting, setSubmitting]   = useState(false);
    const [error, setError]             = useState(null);

    const handleChangePassword = async (values) => {
        try {
            setError(null);
            setSubmitting(true);

            console.log(changePassword.challengeParam);

            // console.log(changePassword);
            await Auth.completeNewPassword(changePassword, values.password, {
                 name        : changePassword.challengeParam.userAttributes["name"],
                 family_name : changePassword.challengeParam.userAttributes["family_name"],
                 phone_number : "+447900688301"
            });

            history.push('/terms');

        } catch (error) {
            setError(error);
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                password: '',
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string().required().min(2),
            })}
            onSubmit={(values) => {
                handleChangePassword(values);
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
                                type="password"
                                variant="outlined"
                                placeholder="Enter your password here"
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
                                id={'testChangePassword'}
                                fullWidth={true}
                                disabled={!isValid || submitting}
                            >
                                Login
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
