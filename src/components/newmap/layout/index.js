import PolygonLayout from '../polygon-layout';
import Header from '../header';
import styles from './layout.module.scss';
import {Map} from "../index";

const Layout = ({ children, offset }) => (
  <>
      <Map  offset={offset}/>
  </>
);

export default Layout;
