import { Map, Polygon, PolygonThreeGroup } from '..';
import styles from './polayout.module.scss';

const PolygonLayout = ({offset}) => (
  <div className={styles.container}>
    <div>
      <PolygonThreeGroup className={styles.polygons__three_left} />
      <Polygon.Sm className={styles.polygons__three_left_sm_left} />
      <Polygon.Sm className={styles.polygons__three_left_sm_top_right} />
      <Polygon.Sm className={styles.polygons__three_left_sm_top_bottom} />
    </div>
    <Polygon.Md className={styles.polygons__top_md_left} light />
    <Polygon.Md className={styles.polygons__top_md_right} />
    <div>
      <PolygonThreeGroup className={styles.polygons__three_top_right} rotate />
      <Polygon.Sm className={styles.polygons__three_top_right_sm_left_top} />
      <Polygon.Sm
        className={styles.polygons__three_top_right_sm_left_bottom}
        light
      />
      <Polygon.Sm className={styles.polygons__three_top_right_sm_right} />
    </div>
    <div>
      <Polygon.Sm className={styles.polygons__bottom_sm_1} light />
      <Polygon.Md className={styles.polygons__bottom_md_2} light />
      <Polygon.Sm className={styles.polygons__bottom_sm_3} />
      <Polygon.Sm className={styles.polygons__bottom_sm_4} />
      <Polygon.Md className={styles.polygons__bottom_md_5} />
    </div>

    <Map className={styles.polygons__honeycomb} offset={offset}/>

  </div>
);

export default PolygonLayout;
