import React from 'react';
import { Row, Button } from 'antd';
import './intro.css';

export const Intro = () => {
    return (
        <>
            <div className="main">
                <img src={'/logo-main.png'} />
                <h2 className="heading">has arrived in the port of Rotterdam</h2>
                <div className="buttons">
                    <Button type="primary" size={'large'}>
                        Sign Up
                    </Button>
                    <div className="space"></div>
                    <Button type={'default'} size={'large'}>
                        Sign In
                    </Button>
                </div>
            </div>
            <div className="footer">
                <div>
                    <div className="stats_card">
                        60 units <span>over</span> 3 qs km
                    </div>
                    <div className="stats_card">
                        100 kw <span>generated</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Container = ({ children }) => {
    return (
        <div className="container">
            {children || <Intro />}
            <div className="corner corner_top">
                <img src={'/vector-13.png'} />
            </div>
            <div className="corner corner_bottom">
                <img src={'/vector-14.png'} />
            </div>
            <div className="copyright">
                <span>© Copyright 2022 distro.energy</span>
            </div>
        </div>
    );
};

export default Intro;
