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

import mainTitle from './image/mainTheme.png';

const Main = (props) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const [todos, setTodos] = useState(tasks[0].taskDays);
  const [groups, setGroups] = useState(userData);
  const [groupName, setGroupName] = useState(groups[0].name);
  const [members, setMembers] = useState(groups[0].users);
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

  const handleGroup = (groupId) => {
    const selectedGroup = groups.filter((group) => group.groupId == groupId);
    setMembers(selectedGroup[0].users);
    setGroupName(selectedGroup[0].name);
    handleUser(selectedGroup[0].users[0].userId);
  };

  const handleUser = (userId) => {
    const selectedTodos = tasks.filter((task) => task.userId == userId);
    setTodos(selectedTodos[0]?.taskDays);
  };

  return (
    <section className={styles.main}>
      <header className={styles.header}>
        <img src={mainTitle} alt='mainTitle' className={styles.mainTitle} />
        <div>
          <button className={styles.logoutBtn}>MyName</button>
          <button className={styles.logoutBtn}>Log out</button>
        </div>
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
            members={members}
            groupName={groupName}
            handleUser={handleUser}
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
