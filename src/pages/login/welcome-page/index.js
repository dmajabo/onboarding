import React, { useEffect, useState } from 'react';
// import { DummySection, Layout } from './../../../components/newmap';
// import useDarkMode from './../../../hooks/useDarkMode';
// import styles from './home.module.scss';
import { useHistory } from 'react-router-dom';
// import useInterval from '../../../hooks/useInterval';
// import Map from '../map';

import { Button } from 'antd';

const Home = () => {
    // const [classNames] = useDarkMode(styles, ['headline__span']);
    // const [timer, setTimer] = useState(0);
    // const [offset, setOffset] = useState(0);

    // useInterval(
    //     () => {
    //         setTimer(timer + 0.02);
    //         if (timer > 1) setTimer(0);
    //     },
    //     // Delay in milliseconds or null to stop it
    //     1 / 30
    // );

    const history = useHistory();

    return (
        <>
            <div className="main">
                <img src={'/logo-main.png'} />
                <h2 className="heading">has arrived in the port of Rotterdam</h2>
                <div className="buttons">
                    <Button type="primary" size={'large'} onClick={() => history.push('/register')}>
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

    // return (
    //     <div>
    //         <div className="bannerTxt">
    //             <div className="inner">
    //                 <div className="panels panels-blue">
    //                     <a href="#" className="btns" onClick={() => navigation.push('login')}>
    //                         {' '}
    //                         Login
    //                     </a>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="blend fullCover">
    //             <Layout offset={timer} />
    //             <div className="overlays fullCover">test</div>
    //         </div>{' '}
    //     </div>
    // );
};

export default Home;
