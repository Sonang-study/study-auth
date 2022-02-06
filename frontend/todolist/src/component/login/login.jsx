import React from 'react';
import styles from "./login.module.css"
const Login = (props) => {
  return (
    <section className={styles.login}>
      <form className={styles.mailLogin}>
        <input type='text' className={styles.id} placeholder="  ID"/>
        <input type='text' className={styles.password} placeholder="  PASSWORD"/>
      </form>
      <div className={styles.ssoLogin}>
        <button className={styles.googleBtn}>Google</button>
        <button className={styles.githubBtn}>GitHub</button>
      </div>
    </section>
  );
};

export default Login;
