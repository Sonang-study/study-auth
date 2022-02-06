import React from 'react';
import styles from './main.module.css';
import Groups from './component/groups/groups';
import Members from './component/members/members';
import TodoList from './component/todolist/todolist';
import Weekly from './component/weekly/weekly';

const Main = (props) => {
  return (
    <section className={styles.main}>
      <header className={styles.group}>
        <Groups />
      </header>
      <body className={styles.body}>
        <section className={styles.member}>
          <Members />
        </section>
        <section className={styles.todo}>
          <Weekly />
          <TodoList />
        </section>
      </body>
    </section>
  );
};

export default Main;
