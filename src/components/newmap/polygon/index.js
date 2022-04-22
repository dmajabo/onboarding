import { useContext } from 'react';
import { DarkThemeContext } from '../../../contexts/DarkThemeContext';
import usePolygonAnimate from './usePolygonAnimate';

const handleOpacity = light => (light ? 0.2 : 0.4);

const PolygonSm = ({
  className,
  light = false,
  finalTweenDelay = 0,
  ...rest
}) => {
  const { isDarkMode } = useContext(DarkThemeContext);
  const polygonRef = usePolygonAnimate(finalTweenDelay);

  return (
    <svg
      width={23}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={handleOpacity(light)}
      className={className}
      ref={polygonRef}
      {...rest}
    >
      <path
        d="m17.229 20.249 5.64-9.771L17.23.707H5.946l-5.641 9.77 5.641 9.772H17.23Z"
        fill={isDarkMode ? '#444' : '#FFF'}
      />
    </svg>
  );
};

const PolygonMd = ({
  className,
  light = false,
  finalTweenDelay = 0,
  ...rest
}) => {
  const polygonRef = usePolygonAnimate(finalTweenDelay);
  const { isDarkMode } = useContext(DarkThemeContext);

  return (
    <svg
      width={76}
      height={66}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={handleOpacity(light)}
      className={className}
      ref={polygonRef}
      {...rest}
    >
      <path
        d="M19.31.874h37.5L75.56 33.35 56.81 65.826h-37.5L.56 33.35 19.31.874Z"
        fill={isDarkMode ? '#666' : '#FFF'}
      />
    </svg>
  );
};

const Polygon = {
  Sm: PolygonSm,
  Md: PolygonMd,
};

export default Polygon;
