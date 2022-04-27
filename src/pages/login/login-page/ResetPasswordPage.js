import React, { useState } from 'react';
import { Box, Fade, TextField } from '@mui/material';
import { Button, Form, Input } from 'antd';
import { Typography } from '@mui/material';
import ResetPasswordForm from './components/reset-password-form/ChangePasswordForm';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MailOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import '../login.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
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
                                    <Box marginTop={2}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            disabled={!isValid || submitting}
                                            block
                                            htmlType="submit"
                                        >
                                            Login
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                )}
                {email && <ResetPasswordForm user={email} />}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
