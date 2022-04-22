import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Button, Box, Typography } from '@mui/material';
import Loading from 'components/loading/Loading';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LoginForm = ({changePassword, setResetPassword, setChangePassword}) => {
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    let query = useQuery();

    const handleLogin = async (values) => {

        setError(null);
        setSubmitting(true);

        let response = null;

        try {
            response = await Auth.signIn(values.username, values.password);

            if (response?.challengeName === 'NEW_PASSWORD_REQUIRED') {
                setChangePassword(response);
            } else {
                history.push('/terms');
            }

        } catch (e) {
            setError(e);
            setSubmitting(false);
            if (e.code === 'PasswordResetRequiredException') setResetPassword(values.username);
        }
    };

    return (
        <Formik
            initialValues={{
                username: query.get('email') || '',
                password: query.get('email') ? 'newPassword123$' : '',
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().email().required().min(3),
                password: Yup.string().required().min(6)
            })}
            onSubmit={(values) => {
                handleLogin(values);
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
                        <TextField
                            variant="outlined"
                            placeholder="Enter your email here"
                            id={'username'}
                            fullWidth={true}
                            disabled={query.get('email')}
                            value={values.username}
                            onChange={handleChange('username')}
                            onBlur={handleBlur('username')}
                        />

                        <Box marginTop={3}>
                            <TextField
                                type="password"
                                variant="outlined"
                                id={'password'}
                                placeholder="Enter your password here"
                                fullWidth={true}
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                        </Box>

                        <Box marginTop={3}>
                            <Button style={{
                                textTransform: 'capitalize' }} variant={'text'} onClick={() => history.push('/reset')}>Forgot Password</Button>
                        </Box>

                        {error && (
                            <Box marginTop={3}>
                                <Typography variant="caption" color="error">
                                    {(error.message)}
                                </Typography>
                            </Box>
                        )}
                        <Box marginTop={11}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                id={'login'}
                                size="large"
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

export default LoginForm;
