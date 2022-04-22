import cn from 'classnames';
import { Polygon } from '..';
import styles from './group.module.scss';

const PolygonThreeGroup = ({ className, rotate }) => {
  const containerClassNames = cn(styles.container, className, {
    [styles[`container-rotate`]]: rotate,
  });

  return (
    <div className={containerClassNames}>
      <Polygon.Md className={`${styles.polygon} ${styles.polygon_top}`} />
      <Polygon.Md
        className={`${styles.polygon} ${styles.polygon_left}`}
        finalTweenDelay={0.2}
      />
      <Polygon.Md
        className={`${styles.polygon} ${styles.polygon_bottom}`}
        finalTweenDelay={0.4}
        light
      />
    </div>
  );
};

export default PolygonThreeGroup;
