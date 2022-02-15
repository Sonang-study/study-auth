import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './members.module.css';
import Member from '../member/member';

const Members = ({ onPopupClick }) => {
  const members = [
    { name: 'Sonang' },
    { name: '405' },
    { name: 'DongDaemoon' },
    { name: 'What' },
    { name: 'SHINKO' },
    { name: 'Sonang' },
    { name: '405' },
    { name: 'DongDaemoon' },
  ];

  const onAddMember = () => {
    onPopupClick();
  };

  return (
    <section className={styles.members}>
      <section className={styles.btns}>
        <FontAwesomeIcon
          icon={faPlus}
          className={styles.plusBtn}
          onClick={onAddMember}
        />
      </section>
      <section className={styles.member}>
        {members.map((member) => (
          <Member member={member} />
        ))}
      </section>
    </section>
  );
};

export default Members;
