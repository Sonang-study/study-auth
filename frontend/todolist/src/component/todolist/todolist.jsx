import React, { useRef, useState } from 'react';
import tasks from '../../db/database';
import styles from './todolist.module.css';

const TodoList = (props) => {
  const [todos, setTodos] = useState(tasks[0].taskDays);
  const inputValue = useRef(null);
  const dateForm = useRef(null);
  const [onInput, setOnInput] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const todo = inputValue.current.value;
      setTodos([{ id: Date.now(), finishedAt: null, dayPlan: todo }, ...todos]);
      inputValue.current.value = '';
    }
  };

  const handleInput = () => {
    setOnInput(!onInput);
  };

  const handleClick = (e) => {
    if (e.target.tagName === 'LI') {
      const key = e.target.dataset.key;
      const newTodos = todos.map((todo) => {
        if (String(todo.id) === String(key)) {
          todo.finishedAt = todo.finishedAt ? null : Date.now();
        }
        return todo;
      });
      setTodos(newTodos);
    }
  };

  const handleDelete = (e) => {
    const key = e.target.dataset.key;
    const newTodos = todos.filter((todo) => String(todo.id) !== String(key));
    setTodos(newTodos);
  };
  const handleChange = (e) => {
    const now = new Date();
    const date = now.getDate();
    const month =
      now.getMonth() + 1 < 10
        ? 0 + `${now.getMonth() + 1}`
        : now.getMonth() + 1;
    const year = now.getFullYear();
    const nowDate = `${year}-${month}-${date}`;
    console.log(tasks[0].createdAt.slice(0, 10), nowDate);
    console.log(dateForm.current.value);
  };
  return (
    <section className={styles.todolist}>
      <section className={styles.header}>
        <span className={styles.span}>Todolist</span>
        <div>
          <input
            type='date'
            className={styles.date}
            ref={dateForm}
            onChange={handleChange}
          />
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
              ref={inputValue}
              onKeyPress={handleKeyPress}
            />
          )}
          <ul className={styles.ul} onClick={handleClick}>
            {todos.map((todo) =>
              !todo.finishedAt ? (
                <li className={styles.list} data-key={todo.id}>
                  {todo.dayPlan}
                  <button
                    data-key={todo.id}
                    className={styles.todoBtn}
                    onClick={handleDelete}
                  >
                    ❌
                  </button>
                </li>
              ) : (
                <s>
                  <li className={styles.list} data-key={todo.id}>
                    {todo.dayPlan}
                    <button
                      data-key={todo.id}
                      className={styles.todoBtn}
                      onClick={handleDelete}
                    >
                      ❌
                    </button>
                  </li>
                </s>
              )
            )}
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
