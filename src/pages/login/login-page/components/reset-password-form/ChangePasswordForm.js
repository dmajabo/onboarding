import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Button, Form, Input } from 'antd';
import { MailOutlined, LockOutlined, NumberOutlined } from '@ant-design/icons';
import Loading from 'components/loading/Loading';

const ChangePasswordForm = ({ user }) => {
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Send confirmation code to user's email
    useEffect(() => {
        if (true) Auth.forgotPassword(user);
        // alert("this should happen just once")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResetPassword = async values => {
        setError(null);
        setSubmitting(true);

        Auth.forgotPasswordSubmit(user, values.code, values.password)
            .then(data => {
                return Auth.signIn(user, values.password);
            })
            .then(data => {
                history.push('/terms'); //terms page will forward user on to the right place
            })
            .catch(e => {
                //alert('error')
                setError(e);
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={{
                code: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                code: Yup.string()
                    .required()
                    .min(2),
                password: Yup.string()
                    .required()
                    .min(2)
            })}
            onSubmit={values => {
                handleResetPassword(values);
            }}
        >
            {({ errors, values, handleChange, handleBlur, handleSubmit, isValid }) => (
                <form onSubmit={handleSubmit}>
                    <Box width="100%" maxWidth="400px" margin="auto">
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input
                                prefix={<NumberOutlined className="site-form-item-icon" />}
                                size={'large'}
                                placeholder="Enter the code we have emailed"
                                value={values.code}
                                onChange={handleChange('code')}
                                onBlur={handleBlur('code')}
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder={'password'}
                                size={'large'}
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                        </Form.Item>
                        {error && (
                            <Box marginTop={3}>
                                <Typography variant="caption" color="error">
                                    {error.message}
                                </Typography>
                            </Box>
                        )}
                        <Box marginTop={2}>
                            <Button
                                type="primary"
                                size="large"
                                disabled={!isValid || submitting}
                                block
                                htmlType="submit"
                            >
                                Change password
                            </Button>
                        </Box>
                    </Box>

                    {submitting && <Loading />}
                </form>
            )}
        </Formik>
    );
};

export default ChangePasswordForm;
