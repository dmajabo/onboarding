import React from 'react';
import { Layout, Row, Col, Card, Button, Space } from 'antd';
import './public.css';

const Container = ({ children }) => {
    return (
        <>
            {children}
            <div style={'public-container'}>
                <h2>demo</h2>
            </div>
        </>
    );
};

export default Container;
