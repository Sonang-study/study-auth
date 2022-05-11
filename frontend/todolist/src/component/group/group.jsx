import React from 'react';
import styles from './group.module.css';
import defaultImage from '../../image/defaultImage.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedGroupState, usersSelector } from '../../service/atom';

const Group = ({ group, groupPresenter }) => {
  const setUsers = useSetRecoilState(usersSelector);
  const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState);
  
  const onGroupClick = async () => {
    const newMembers = await groupPresenter.getGroupMembers(group.id);
    setUsers(newMembers);
    setSelectedGroup(group);
  };
  
  return selectedGroup.id == group.id ? (
    <img
      src={group.image || defaultImage}
      alt='groupImage'
      onClick={onGroupClick}
      className={styles.selectedGroupImage}
    />
  ) : (
    <img
      src={group.image || defaultImage}
      alt='groupImage'
      onClick={onGroupClick}
      className={styles.groupImage}
    />
  );
};

export default Group;
