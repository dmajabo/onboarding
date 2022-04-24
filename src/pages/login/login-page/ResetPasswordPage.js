import React, { useState } from 'react';
import { Box, Fade, TextField } from '@mui/material';
import { Button, Form, Input } from 'antd';
import { Typography } from '@mui/material';
import ResetPasswordForm from './components/reset-password-form/ChangePasswordForm';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MailOutlined } from '@ant-design/icons';
import '../login.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');

    return (
        <div className="auth-container">
            <div className="logo"></div>
            <div className="auth-form">
                <h2>Forgot Password</h2>
                {!email && (
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email()
                        })}
                        onSubmit={values => {
                            setEmail(values.email);
                            //  handleResetPassword(values);
                        }}
                    >
                        {({ errors, values, handleChange, handleBlur, handleSubmit, isValid }) => (
                            <form onSubmit={handleSubmit}>
                                <Box width="100%" margin="auto">
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input
                                            prefix={<MailOutlined className="site-form-item-icon" />}
                                            size={'large'}
                                            placeholder="Enter your email"
                                            value={values.email}
                                            onChange={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                        />
                                    </Form.Item>
                                    <Box marginTop={1}>
                                        <Button type="primary" size="large" block>
                                            Login
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                )}
                {/* {email && (
                    <Box marginTop={5} width="100%">
                        <ResetPasswordForm user={email} />
                    </Box>
                )} */}
            </div>
        </div>
    );

    return (
        <Fade in={true} timeout={750}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box marginTop={5}></Box>
                <Box marginTop={8}>
                    <Typography variant="h2" align="center">
                        Forgot Password
                    </Typography>

                    {!email && (
                        <Formik
                            initialValues={{
                                email: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email()
                            })}
                            onSubmit={values => {
                                setEmail(values.email);
                                //  handleResetPassword(values);
                            }}
                        >
                            {({ errors, values, handleChange, handleBlur, handleSubmit, isValid }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box width="100%" maxWidth="400px" margin="auto">
                                        <Box marginTop={3}>
                                            <TextField
                                                type="text"
                                                variant="outlined"
                                                placeholder="Enter your email"
                                                fullWidth={true}
                                                value={values.email}
                                                onChange={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                            />
                                        </Box>

                                        <Box marginTop={11}>
                                            {/* <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                fullWidth={true}
                                            >
                                                Login
                                            </Button> */}
                                            <Button
                                                size="large"
                                                fullWidth={true}
                                                // disabled={!isValid || submitting}
                                                type={'primary'}
                                                block
                                            >
                                                Login
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    )}
                </Box>
                {email && (
                    <Box marginTop={5} width="100%">
                        <ResetPasswordForm user={email} />
                    </Box>
                )}
            </Box>
        </Fade>
    );
};

export default ResetPasswordPage;
