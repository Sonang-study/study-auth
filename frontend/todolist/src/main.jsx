import React, { useState } from 'react';
import styles from './main.module.css';
import Groups from './component/groups/groups';
import Members from './component/members/members';
import TodoList from './component/todolist/todolist';
import Weekly from './component/weekly/weekly';
import AddGroup from './component/popup/addGroup/addGroup';

const Main = (props) => {
  const [onPopup, setOnPopup] = useState(false);

  const popupClick = () => {
    setOnPopup(!onPopup);
    console.log('FUCK');
  };

  return (
    <section className={styles.main}>
      <header className={styles.group}>
        <Groups onPopupClick={popupClick} />
      </header>
      <body className={styles.body}>
        <section className={styles.member}>
          <Members onPopupClick={popupClick} />
        </section>
        <section className={styles.todo}>
          {onPopup && <AddGroup />}
          <Weekly className={styles.weekly} />
          <TodoList className={styles.todolist} />
        </section>
      </body>
    </section>
  );
};

export default Main;
