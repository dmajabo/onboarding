/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import styles from './theme.module.scss';
import { DarkThemeContext } from '../../../contexts/DarkThemeContext';
const ThemeToggle = ({ className }) => {
  const { isDarkMode, toggleTheme } = useContext(DarkThemeContext);
  const [classNames] = useDarkMode(styles, ['container'], [className]);

  return (
    <div className={classNames[0]}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="chk"
        onChange={toggleTheme}
        defaultChecked={isDarkMode}
      />
      <label className={styles.label} htmlFor="chk">
        <div className={styles.ball} />
      </label>
    </div>
  );
};

export default ThemeToggle;
