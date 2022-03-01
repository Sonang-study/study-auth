import React from 'react';
import styles from './group.module.css';
import defaultImage from '../../image/defaultImage.png';

const Group = ({ group, handleGroup }) => {
  const onGroupClick = (e) => {
    const groupId = e.target.dataset.id;
    handleGroup(groupId);
  };
  return (
    <img
      src={group.image || defaultImage}
      data-id={group.id}
      alt='groupImage'
      onClick={onGroupClick}
      className={styles.groupImage}
    />
  );
};

export default Group;
