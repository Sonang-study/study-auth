import React, { useState } from 'react';
import styles from './todolist.module.css';

const TodoList = (props) => {
  const [todos, setTodos] = useState([
    { name: 'one', isCompleted: false },
    { name: 'one', isCompleted: false },
    { name: 'one', isCompleted: false },
    { name: 'one', isCompleted: false },
  ]);
  return (
    <section className={styles.todolist}>
      <section className={styles.header}>
        <span className={styles.span}>Todolist</span>
        <button className={styles.editBtn}>Edit</button>
      </section>
      <section className={styles.body}>
        <ul className={styles.ul}>
          {todos.map((todo) => (
            <li className={styles.list}>{todo.name}</li>
          ))}
        </ul>
        <section className={styles.memo}>
          <span>Memo</span>
        </section>
      </section>
    </section>
  );
};

export default TodoList;
