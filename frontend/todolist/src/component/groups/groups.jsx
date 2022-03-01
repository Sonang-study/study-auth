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
    <div className={styles.groups}>
      <section className={styles.btns}>
        <FontAwesomeIcon
          icon={faPlus}
          className={styles.plusBtn}
          onClick={onAddGroup}
        />
      </section>
      <section className={styles.group}>
        {groups.map((group) => (
          <Group group={group} />
        ))}
      </section>
    </div>
  );
};

export default Groups;
