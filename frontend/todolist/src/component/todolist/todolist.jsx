import React, { memo, useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { toDoSelector } from '../../service/atom';
import styles from './todolist.module.css';
import ToDo from '../todo/todo';

const TodoList = memo(
  ({
    todoPresenter,
    pageDate,
    finishedTodo,
    addTodo,
    deleteTodo,
    handlePageDate,
  }) => {
    const [toDos, setToDos] = useRecoilState(toDoSelector);
    const [dayToDo, setDayToDo] = useState();
    const [onInput, setOnInput] = useState(false);
    const [fileImage, setFileImage] = useState('');
    const inputValue = useRef(null);
    const dateForm = useRef(null);

    useEffect(async () => {
      await todoPresenter.getTodos().then((todo) => {
        setDayToDo(todo.dayPlan);
        setToDos(todo.taskDays);
      });
    }, []);

    const handleKeyPress = async (e) => {
      if (e.key === 'Enter') {
        const todo = inputValue.current.value;
        await todoPresenter.add(todo);
        inputValue.current.value = '';

        await todoPresenter.getTodos().then((todo) => {
          setDayToDo(todo.dayPlan);
          setToDos(todo.taskDays);
        });
      }
    };

    const handleInput = () => {
      setOnInput(!onInput);
    };

    const handleClick = (e) => {
      if (e.target.tagName === 'LI') {
        const { key, dayplan: dayPlan } = e.target.dataset;
        finishedTodo(key, dayPlan);
      } else if (e.target.tagName === 'BUTTON') {
        const key = e.target.dataset.key;
        deleteTodo(key);
      }
    };

    const handleChange = (e) => {
      handlePageDate(dateForm.current.value);
    };

    const saveFileImage = (e) => {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    const deleteFileImage = () => {
      URL.revokeObjectURL(fileImage);
      setFileImage('');
    };
    return (
      <section className={styles.todolist}>
        <section className={styles.header}>
          <span className={styles.title}>Todolist</span>
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
          <section className={styles.todo} onClick={handleClick}>
            {onInput && (
              <input
                type='text'
                placeholder='what will you do?'
                className={styles.input}
                ref={inputValue}
                onKeyPress={handleKeyPress}
              />
            )}
            <ul className={styles.todo_lists}>
              {toDos.map((todo, index) => (
                <ToDo todo={todo} key={todo.id} index={index} />
              ))}
            </ul>
          </section>
          <section className={styles.memo}>
            <span>Auth</span>
            <input
              name='imgUpload'
              type='file'
              accept='image/*'
              onChange={saveFileImage}
            />
            <button onClick={() => deleteFileImage()}>Delete</button>
            {fileImage && <img alt='sample' src={fileImage} />}
          </section>
        </section>
      </section>
    );
  }
);

export default TodoList;
