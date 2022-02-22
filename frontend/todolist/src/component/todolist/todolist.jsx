import React, { useRef, useState } from 'react';
import tasks from '../../db/database';
import nowDate from '../../util/date';
import styles from './todolist.module.css';

const TodoList = ({ todos, pageDate, finishedTodo, addTodo, deleteTodo, handlePageDate }) => {
  const [onInput, setOnInput] = useState(false);
  const inputValue = useRef(null);
  const dateForm = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const todo = inputValue.current.value;
      addTodo(todo);
      inputValue.current.value = '';
    }
  };

  const handleInput = () => {
    setOnInput(!onInput);
  };

  const handleClick = (e) => {
    if (e.target.tagName === 'LI') {
      const key = e.target.dataset.key;
      finishedTodo(key);
    }
  };

  const handleDelete = (e) => {
    const key = e.target.dataset.key;
    deleteTodo(key);
  };

  const handleChange = (e) => {
    handlePageDate(dateForm.current.value);
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
            value={pageDate}
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
