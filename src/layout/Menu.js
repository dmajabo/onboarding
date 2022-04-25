import React from 'react';
import { Menu } from 'antd';
import { data } from './data';
import './style.css';

const TopicMenu = () => {
    return (
        <div className="sidebar-container">
            <div>
                <div className="sidebar-logo-container"></div>
                <div className='sidebar-menu-items'>
                    <Menu mode="inline">
                        {data.map((item, index) => {
                            return (
                                <Menu.Item key={index} className={index === 0 ? 'active' : ''}>
                                    <a href={item.path} className="sidebar-link">
                                        {item.name}
                                    </a>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </div>
            </div>
            <div className="user-auth">
                <a href="/logout" className="sidebar-link">
                    Logout
                </a>
            </div>
        </div>
    );
};
export default TopicMenu;
