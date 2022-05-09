import React from 'react';
import { useSetRecoilState } from 'recoil';

import { toDoSelector } from '../../service/atom';
import styles from './member.module.css';

const Member = ({ todoPresenter, member }) => {
  const toDosSelector = useSetRecoilState(toDoSelector);
  const selectUser = async (e) => {
    const newToDos = await todoPresenter.getTodos(member.id);
    toDosSelector(newToDos);
  };
  return (
    <div onClick={selectUser} className={styles.member}>
      {member.firstName}
    </div>
  );
};

export default Member;
