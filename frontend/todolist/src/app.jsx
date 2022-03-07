import { useState, useEffect } from 'react';
import styles from './app.module.css';
import Login from './component/login/login';
import Main from './main';

function App({ authService, tokenStorage }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (tokenStorage.getToken() === null) {
      console.log('isLogin ?? ::', isLogin);
    } else {
      setIsLogin(true);
      console.log('isLogin ?? ::', isLogin);
    }
  });

  return (
    <div className={styles.app}>
      {!isLogin ? <Login authService={authService} /> : <Main />}
    </div>
  );
}

export default App;
