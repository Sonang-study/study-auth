import React from 'react';
import styles from './group.module.css';
import defaultImage from '../../image/defaultImage.png';

const Group = ({ group, handleGroup }) => {
  const onGroupClick = (e) => {
    handleGroup(group.groupId);
  };
  return (
    <img
      src={group.image || defaultImage}
      alt='groupImage'
      onClick={onGroupClick}
      className={styles.groupImage}
    />
  );
};

export default Group;
