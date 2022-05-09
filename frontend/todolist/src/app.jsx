import { useState, useEffect } from 'react';
import styles from './app.module.css';
import Login from './component/login/login';
import Main from './main';

function App({ authService, tokenStorage, todoPresenter, groupPresenter }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (tokenStorage.getToken()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <div className={styles.app}>
      {!isLogin ? (
        <Login authService={authService} setIsLogin={setIsLogin} />
      ) : (
        <Main
          setIsLogin={setIsLogin}
          tokenStorage={tokenStorage}
          todoPresenter={todoPresenter}
          groupPresenter={groupPresenter}
        />
      )}
    </div>
  );
}

export default App;
