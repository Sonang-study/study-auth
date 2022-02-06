import React from 'react';

const Login = (props) => {
  return (
    <section className={styles.login}>
      <form className={styles.mailLogin}>
        <input type='text' className={styles.id} />
        <input type='text' className={styles.password} />
      </form>
      <div clasName={styles.ssoLogin}>
        <button className={styles.googleBtn}>Google</button>
        <button className={styles.githubBtn}>GitHub</button>
      </div>
    </section>
  );
};

export default Login;
