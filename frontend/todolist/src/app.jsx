import { useState, useEffect } from 'react';
import styles from './app.module.css';
import Login from './component/login/login';
import Main from './main';

function App({ authService, tokenStorage }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={styles.app}>
      {!isLogin ? (
        <Login authService={authService} setIsLogin={setIsLogin} />
      ) : (
        <Main setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
