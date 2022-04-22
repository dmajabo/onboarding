import ThemeToggle from '../theme-toggle';
import useDarkMode from '../../../hooks/useDarkMode';
import styles from './header.module.scss';

const Header = () => {
  const [classNames] = useDarkMode(styles, ['header', 'header__title']);

  return (
    <header className={classNames[0]}>
      <div className={`wrapper ${styles.header__content}`}>
        <div>
          <h3 className={classNames[1]}>Distro Energy</h3>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
