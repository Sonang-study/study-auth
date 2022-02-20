import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './groups.module.css';
import Group from '../group/group';

const Groups = ({ onPopupClick }) => {
  const groups = [
    { name: 'Sonang' },
    { name: '405' },
    { name: 'DongDaemoon' },
    { name: 'What' },
    { name: 'SHINKO' },
    { name: 'Sonang' },
    { name: '405' },
  ];

  const onAddGroup = () => {
    onPopupClick();
  };
  return (
    <div className={styles.header}>
      <section className={styles.icon}>
        <FontAwesomeIcon icon={faPlus} />
      </section>
      <section className={styles.groups}>
        {groups.map((group) => (
          <Group group={group} />
        ))}
      </section>

      <section className={styles.btns}>
        <button className={styles.addBtn} onClick={onAddGroup}>
          ADD
        </button>
        <button className={styles.logoutBtn}>Log out</button>
      </section>
    </div>
  );
};

export default Groups;
