import React from 'react';
import { Layout } from 'antd';
import './style.css';

const SideBar = ({ menu }) => {
    return (
        <Layout.Sider
            className="sidebar"
            breakpoint={'lg'}
            collapsedWidth={0}
            trigger={null}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0
            }}
        >
            {menu}
        </Layout.Sider>
    );
};
export default SideBar;
