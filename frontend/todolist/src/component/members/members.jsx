import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './members.module.css';
import Member from '../member/member';

const Members = ({ members, groupName, handleUser, onPopupClick }) => {
  const onAddMember = () => {
    onPopupClick();
  };

  return (
    <section className={styles.members}>
      <section className={styles.btns}>
        <span className={styles.groupName}>{groupName}</span>
        <FontAwesomeIcon
          icon={faPlus}
          className={styles.plusBtn}
          onClick={onAddMember}
        />
      </section>
      <section className={styles.member}>
        {members.map((member, index) => (
          <Member handleUser={handleUser} key={index} member={member} />
        ))}
      </section>
    </section>
  );
};

export default Members;
