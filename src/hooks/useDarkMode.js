import { useContext } from 'react';
import cn from 'classnames';
import { DarkThemeContext } from './../contexts/DarkThemeContext';

const useDarkMode = (styles, names, givenClassNames = []) => {
  const { isDarkMode } = useContext(DarkThemeContext);

  const classNames = names.map((name, idx) =>
    cn(styles[name], givenClassNames[idx], {
      [styles[`${name}-dark`]]: isDarkMode,
    }),
  );

  return [classNames];
};

export default useDarkMode;
