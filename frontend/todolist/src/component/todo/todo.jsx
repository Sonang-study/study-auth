import React from 'react';
import styles from './todo.module.css';

const ToDo = ({ todo, index }) => {
  return !todo.finishedAt ? (
    <li
      className={styles.todo_list}
      key={index}
      data-key={todo.id}
      data-dayplan={todo.plan}
    >
      <button data-key={todo.id} className={styles.todoBtn}>
        ✓
      </button>
      {todo.plan}
    </li>
  ) : (
    <li
      className={styles.todo_list}
      key={index}
      data-key={todo.id}
      data-dayplan={todo.plan}
    >
      <button data-key={todo.id} className={styles.todoBtn}>
        ✓
      </button>
      <s>{todo.plan}</s>
    </li>
  );
};

export default ToDo;
