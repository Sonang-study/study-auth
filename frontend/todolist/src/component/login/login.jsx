import React, { useState, useEffect } from 'react';
import Banner from '../banner/banner';
import styles from './login.module.css';
const Login = ({ authService, setIsLogin }) => {
  const [isError, setIsError] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [text, setText] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (signUp) {
      await authService
        .signup(firstName, lastName, email, password)
        .then(() => setIsLogin(true))
        .catch((error) => setError(error));
    } else {
      await authService
        .login(email, password)
        .then(() => setIsLogin(true))
        .catch((error) => setError(error));
    }
  };

  const setError = (error) => {
    setText(error.toString());
    setIsError(true);
  };

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'firstName':
        return setFirstName(value);
      case 'lastName':
        return setLastName(value);
      case 'signup':
        return setSignUp(checked);
      default:
    }
  };

  return (
    <section className={styles.login}>
      <Banner text={text} isError={isError} />
      <form className={styles.mailLogin} onSubmit={onSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={onChange}
          className={styles.id}
          required
        />
        <input
          name='password'
          type='password'
          placeholder='PASSWORD'
          value={password}
          onChange={onChange}
          className={styles.id}
          required
        />
        {signUp && (
          <input
            name='firstName'
            type='text'
            placeholder='FirstName'
            value={firstName}
            onChange={onChange}
            className={styles.id}
            required
          />
        )}
        {signUp && (
          <input
            name='lastName'
            type='text'
            placeholder='LastName'
            value={lastName}
            onChange={onChange}
            className={styles.password}
            required
          />
        )}
        <div className='form-signup'>
          <input
            name='signup'
            id='signup'
            type='checkbox'
            onChange={onChange}
            checked={signUp}
          />
          <label htmlFor='signup'> Create a new account?</label>
        </div>

        <div className={styles.ssoLogin}>
          <button type='submit' className={styles.googleBtn}>
            {signUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
