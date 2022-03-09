import React, { memo } from 'react';
import styles from './header.module.css';
import mainTitle from '../../image/mainTheme.png';

const Header = memo(({ tokenStorage, setIsLogin }) => {
  const onLogOut = () => {
    tokenStorage.clearToken();
    setIsLogin(false);
  };
  return (
    <header className={styles.header}>
      <img src={mainTitle} alt='mainTitle' className={styles.mainTitle} />
      <div>
        <button className={styles.logoutBtn}>MyName</button>
        <button onClick={onLogOut} className={styles.logoutBtn}>
          Log out
        </button>
      </div>
    </header>
  );
});

export default Header;
