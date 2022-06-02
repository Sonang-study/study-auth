import React from 'react';
import styles from './todo.module.css';

const ToDo = ({ todo, index }) => {
  console.log("todo",todo)
    
  return !todo.finishedAt ? (
    <li
      className={styles.todo_list}
      key={index}
      data-key={todo.id}
      data-dayplan={todo.dayPlan}
    >
      <button data-key={todo.id} className={styles.todoBtn}>
        ✓
      </button>
      {todo.dayPlan}
    </li>
  ) : (
    <li
      className={styles.todo_list}
      key={index}
      data-key={todo.id}
      data-dayplan={todo.dayPlan}
    >
      <button data-key={todo.id} className={styles.todoBtn}>
        ✓
      </button>
      <s>{todo.dayPlan}</s>
    </li>
  );
};

export default ToDo;
