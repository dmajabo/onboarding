import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Row, Col, Input, Form, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Loading from 'components/loading/Loading';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SignupForm = () => {
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    let query = useQuery();

    const handleSignup = async values => {
        setError(null);
        setSubmitting(true);

        try {
            await Auth.signUp(values.username, values.password);
        } catch (e) {
            setError(e);
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                username: query.get('email') || '',
                password: query.get('email') ? 'newPassword123$' : ''
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .email()
                    .required()
                    .min(3),
                password: Yup.string()
                    .required()
                    .min(6)
            })}
            onSubmit={values => {
                handleSignup(values);
            }}
        >
            {({ errors, values, handleChange, handleBlur, handleSubmit, isValid }) => (
                <form onSubmit={handleSubmit}>
                    <Box width="100%" margin="auto">
                        <Form.Item name="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                size={'large'}
                                disabled={query.get('username')}
                                value={values.username}
                                onChange={handleChange('username')}
                            />
                        </Form.Item>
                        {/* <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                    size={'large'}
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                            </Form.Item> */}
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
                                variant="contained"
                                id={'login'}
                                size="large"
                                fullWidth={true}
                                disabled={!isValid || submitting}
                                type={'primary'}
                                block
                                htmlType="submit"
                            >
                                Sign Up
                            </Button>
                        </Box>
                        <Box marginTop={3}>
                            <Row className="auth-footer">
                                <p>Already have an account?</p>
                                <Button type={'link'} onClick={() => history.push('/login')}>
                                    Log in
                                </Button>
                            </Row>
                        </Box>
                    </Box>

                    {submitting && <Loading />}
                </form>
            )}
        </Formik>
    );
};

export default SignupForm;
