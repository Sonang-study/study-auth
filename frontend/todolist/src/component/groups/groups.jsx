import React from 'react';
import styles from './groups.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Group from '../group/group';

const Groups = (props) => {
  const groups = [
    { name: 'Sonang' },
    { name: '405' },
    { name: 'DongDaemoon' },
    { name: 'What' },
  ];
  return (
    <div className={styles.header}>
      <section className={styles.groups}>
        {groups.map((group) => (
          <Group group={group} />
        ))}
      </section>

      <section className={styles.btns}>
        <button className={styles.addBtn}>ADD</button>
        <button className={styles.logoutBtn}>Log out</button>
      </section>
    </div>
  );
};

export default Groups;
