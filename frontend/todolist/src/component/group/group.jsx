import React from 'react';
import styles from './group.module.css';

const Group = ({ group }) => {
  return <div className={styles.group}>{group.name}</div>;
};

export default Group;
