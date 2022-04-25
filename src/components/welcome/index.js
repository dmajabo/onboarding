import React from 'react';
import { Row, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const Welcome = () => {
    const history = useHistory();
    return (
        <>
            <div className="main">
                <img src={'/logo-main.png'} />
                <h2 className="heading">has arrived in the port of Rotterdam</h2>
                <div className="buttons">
                    <Button type="primary" size={'large'} onClick={() => history.push('/login')}>
                        Sign Up
                    </Button>
                    <div className="space"></div>
                    <Button type={'default'} size={'large'} onClick={() => history.push('/login')}>
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

export default Welcome;
