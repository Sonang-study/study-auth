import React, { memo, useRef, useState } from 'react';
import styles from './todolist.module.css';

const TodoList = memo(
  ({ todos, pageDate, finishedTodo, addTodo, deleteTodo, handlePageDate }) => {
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
      } else if (e.target.tagName === 'BUTTON') {
        const key = e.target.dataset.key;
        deleteTodo(key);
      }
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
              {todos.map((todo, index) =>
                !todo.finishedAt ? (
                  <li className={styles.list} key={index} data-key={todo.id}>
                    <button data-key={todo.id} className={styles.todoBtn}>
                      ✓
                    </button>
                    {todo.dayPlan}
                  </li>
                ) : (
                  <s key={index}>
                    <li className={styles.list} data-key={todo.id}>
                      <button data-key={todo.id} className={styles.todoBtn}>
                        ✓
                      </button>
                      {todo.dayPlan}
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
  }
);

export default TodoList;
