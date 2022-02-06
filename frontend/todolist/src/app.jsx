import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import Login from './component/login/login';
import Main from './main';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/todo' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
