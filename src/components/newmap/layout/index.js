import PolygonLayout from '../polygon-layout';
import Header from '../header';
import styles from './layout.module.scss';
import { Map } from '../index';

const Layout = ({ children, offset }) => (
    <>
        <div style={{ mixBlendMode: 'luminosity' }}>
            <Map offset={offset} />
        </div>
    </>
);

export default Layout;
