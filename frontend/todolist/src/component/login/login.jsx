import React, { useState, useRef } from 'react';
import styles from './login.module.css';
const Login = ({ authService }) => {
  const [noId, setNoId] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const onClickSignup = () => {
    setNoId(!noId);
  };
  const onSign = (e) => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const firstName = fNameRef.current.value;
    const lastName = lNameRef.current.value;
    authService.signup(firstName, lastName, email, password);
  };
  const onLogin = () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    authService.login(email, password);
  };
  return (
    <section className={styles.login}>
      <form className={styles.mailLogin} onSubmit={onSign}>
        <input
          type='email'
          ref={emailRef}
          className={styles.id}
          placeholder='Email'
        />
        <input
          type='password'
          ref={passRef}
          className={styles.id}
          placeholder='PASSWORD'
        />
        {!noId && (
          <input
            type='text'
            ref={fNameRef}
            className={styles.id}
            placeholder='FirstName'
          />
        )}
        {!noId && (
          <input
            type='text'
            ref={lNameRef}
            className={styles.password}
            placeholder='LastName'
          />
        )}
      </form>
      <div className={styles.ssoLogin}>
        <button onClick={noId?onClickSignup:onSign} className={styles.googleBtn}>
          Sign Up
        </button>
        <button onClick={onLogin} className={styles.googleBtn}>
          Sign In
        </button>
      </div>
    </section>
  );
};

export default Login;
