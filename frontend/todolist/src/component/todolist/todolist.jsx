import React, { useState } from 'react';
import styles from './todolist.module.css';

const TodoList = (props) => {
  const [todos, setTodos] = useState([
    { name: 'one', isCompleted: false },
    { name: 'one', isCompleted: false },
    { name: 'one', isCompleted: false },
    { name: 'one', isCompleted: false },
  ]);
  const [onInput, setOnInput] = useState(false);

  const handleInput = () => {
    setOnInput(!onInput);
  };
  return (
    <section className={styles.todolist}>
      <section className={styles.header}>
        <span className={styles.span}>Todolist</span>
        <div>
          <input type='date' className={styles.date} />
          <button className={styles.editBtn} onClick={handleInput}>
            Edit
          </button>
        </div>
      </section>
      <section className={styles.body}>
        <section className={styles.todo}>
          {onInput && (
            <input
              type='text'
              placeholder='what will you do?'
              className={styles.input}
            />
          )}
          <ul className={styles.ul}>
            {todos.map((todo) => (
              <li className={styles.list}>{todo.name}</li>
            ))}
          </ul>
        </section>
        <section className={styles.memo}>
          <span>Memo</span>
        </section>
      </section>
    </section>
  );
};

export default TodoList;
