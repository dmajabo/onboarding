import React, { useEffect, useState } from 'react';
import { Button, DummySection, Layout } from './../../../components/newmap';
import useDarkMode from './../../../hooks/useDarkMode';
import styles from './home.module.scss';
import {useHistory} from "react-router-dom";
import useInterval from "../../../hooks/useInterval";
import Map from "../map";
import {Box} from "@mui/material";

const Home = () => {
  const [classNames] = useDarkMode(styles, ['headline__span']);
  const [timer, setTimer]             = useState(0);
  const [offset, setOffset]           = useState(0);

  useInterval(
      () => {
        setTimer(timer + 0.02)
        if (timer > 1) setTimer(0);
      },
      // Delay in milliseconds or null to stop it
      1/30
  )

  const navigation = useHistory();

  //return <WelcomePage2/>
  return (  <div>
      <div className="bannerTxt">
          <div className="inner">
              <div className="panels panels-blue">
                  <a href="#" className="btns"  onClick={() => navigation.push('login')}> Login</a>
              </div>
          </div>
      </div>

      <div className="blend fullCover">
                <Layout offset={timer}/>
                <div className="overlays fullCover">test</div>
      </div> </div> );
};

export default Home;
