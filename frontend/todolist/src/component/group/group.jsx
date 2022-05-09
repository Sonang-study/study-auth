import React from 'react';
import styles from './group.module.css';
import defaultImage from '../../image/defaultImage.png';
import { useSetRecoilState } from 'recoil';
import { usersSelector } from '../../service/atom';

const Group = ({ group, groupPresenter }) => {
  const setUsers = useSetRecoilState(usersSelector);
  const onGroupClick = async () => {
    const newMembers = await groupPresenter.getGroupMembers(group.id);
    setUsers(newMembers);
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
