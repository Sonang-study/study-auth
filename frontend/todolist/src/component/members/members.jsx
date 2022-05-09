import React, { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './members.module.css';
import Member from '../member/member';
import { useRecoilState } from 'recoil';
import { membersState } from '../../service/atom';

const Members = memo(
  ({ groupPresenter, todoPresenter, handleUser, onPopupClick }) => {
    const [members, setMembers] = useRecoilState(membersState);
    
    useEffect(async () => {
      await groupPresenter
        .getGroupMembers()
        .then((member) => setMembers(member));
    }, []);


    const onAddMember = () => {
      onPopupClick();
    };

    return (
      <section className={styles.members}>
        <section className={styles.btns}>
          {/* <span className={styles.groupName}>{groupName}</span> */}
          <FontAwesomeIcon
            icon={faPlus}
            className={styles.plusBtn}
            onClick={onAddMember}
          />
        </section>
        <section className={styles.member}>
          {members.map((member, index) => (
            <Member todoPresenter={todoPresenter} handleUser={handleUser} key={index} member={member} />
          ))}
        </section>
      </section>
    );
  }
);

export default Members;
