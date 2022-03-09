import React, { useState } from 'react';
import styles from './weekly.module.css';

const Weekly = (props) => {
  const [date, setDate] = useState([
    { date: 'Mon', todos: ['one', 'two', 'three', 'four'] },
    { date: 'Tues', todos: ['one', 'two', 'three', 'four'] },
    { date: 'Wed', todos: ['one', 'two', 'three', 'four'] },
    { date: 'Thurs', todos: ['one', 'two', 'three', 'four'] },
    { date: 'Fri', todos: ['one', 'two', 'three', 'four'] },
    { date: 'Sat', todos: ['one', 'two', 'three', 'four'] },
    { date: 'Sun', todos: ['one', 'two', 'three', 'four'] },
  ]);
  return (
    <section className={styles.weekly}>
      <section className={styles.header}>
        <span className={styles.span}>Weekly</span>
      </section>
      <section className={styles.body}>
        {date.map((name, index) => (
          <div key={index}>
            <span>{name.date}</span>
            <ul>
              {name.todos.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Weekly;
