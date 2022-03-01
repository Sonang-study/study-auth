import React, { useState } from 'react';
import styles from './main.module.css';
import Groups from './component/groups/groups';
import Members from './component/members/members';
import TodoList from './component/todolist/todolist';
import Weekly from './component/weekly/weekly';
import AddGroup from './component/popup/addGroup/addGroup';
import tasks from './db/database.js';
import userData from './db/users.js';
import nowDate from './util/date';

const Main = (props) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const [todos, setTodos] = useState(tasks[0].taskDays);
  const [groups, setGroups] = useState(userData);
  const [members, setMembers] = useState(groups);
  const [pageDate, setPageDate] = useState(nowDate);

  const popupClick = () => {
    setTogglePopup(!togglePopup);
  };

  const finishedTodo = (key) => {
    const newTodos = todos.map((todo) => {
      if (String(todo.id) === String(key)) {
        todo.finishedAt = todo.finishedAt ? null : Date.now();
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = (todo) => {
    setTodos([{ id: Date.now(), finishedAt: null, dayPlan: todo }, ...todos]);
  };

  const deleteTodo = (key) => {
    const newTodos = todos.filter((todo) => String(todo.id) !== String(key));
    setTodos(newTodos);
  };

  const handlePageDate = (newDate) => {
    setPageDate(newDate);
  };

  const handleGroup = (id) => {
    const selectedGroup = groups.filter((group) => group.id == id);
    setMembers(selectedGroup);
  };

  return (
    <section className={styles.main}>
      <header className={styles.header}>
        <button className={styles.logoutBtn}>Log out</button>
      </header>
      <div className={styles.body}>
        <section className={styles.group}>
          <Groups
            groups={groups}
            handleGroup={handleGroup}
            onPopupClick={popupClick}
          />
        </section>
        <section className={styles.member}>
          <Members
            members={members[0].users}
            groupName={members[0].name}
            onPopupClick={popupClick}
          />
        </section>
        <section className={styles.todo}>
          {togglePopup && <AddGroup />}
          <Weekly className={styles.weekly} />
          <TodoList
            className={styles.todolist}
            todos={todos}
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
};

export default Main;
