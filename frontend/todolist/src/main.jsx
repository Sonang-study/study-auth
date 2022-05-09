import React, { memo, useState, useEffect } from 'react';
import styles from './main.module.css';
import Groups from './component/groups/groups';
import Members from './component/members/members';
import TodoList from './component/todolist/todolist';
import Weekly from './component/weekly/weekly';
import AddGroup from './component/popup/addGroup/addGroup';
import tasks from './db/database.js';
import userData from './db/users.js';
import nowDate from './util/date';
import Header from './component/header/header';

const Main = memo(
  ({ setIsLogin, tokenStorage, todoPresenter, groupPresenter }) => {
    const [togglePopup, setTogglePopup] = useState(false);
    const [myId, setMyId] = useState('');
    const [todos, setTodos] = useState([]);
    const [pageDate, setPageDate] = useState(nowDate);

    useEffect(async () => {
      await todoPresenter.getTodos().then((todos) => setTodos(todos));
      setMyId();
    }, []);

    const popupClick = () => {
      setTogglePopup(!togglePopup);
    };

    const finishedTodo = (key, dayPlan) => {
      todoPresenter.finish(key, dayPlan, setTodos);
    };

    const addTodo = (todo) => {
      todoPresenter.add(todo, setTodos);
    };

    const deleteTodo = (key) => {
      todoPresenter.delete(key, setTodos);
    };

    const handlePageDate = (newDate) => {
      setPageDate(newDate);
    };

    return (
      <section className={styles.main}>
        <Header tokenStorage={tokenStorage} setIsLogin={setIsLogin} />
        <div className={styles.body}>
          <section className={styles.group}>
            <Groups groupPresenter={groupPresenter} onPopupClick={popupClick} />
          </section>
          <section className={styles.member}>
            <Members
              groupPresenter={groupPresenter}
              todoPresenter={todoPresenter}
              onPopupClick={popupClick}
            />
          </section>
          <section className={styles.todo}>
            {togglePopup && <AddGroup />}
            <Weekly className={styles.weekly} />
            <TodoList
              className={styles.todolist}
              todoPresenter={todoPresenter}
              pageDate={pageDate}
              finishedTodo={finishedTodo}
              addTodo={addTodo}
              deleteTodo={deleteTodo}
              handlePageDate={handlePageDate}
            />
          </section>
        </div>
      </section>
    );
  }
);

export default Main;
