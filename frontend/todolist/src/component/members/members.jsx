import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './members.module.css';
import Member from '../member/member';

const Members = (props) => {
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
  return (
    <section className={styles.members}>
      <section className={styles.btns}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusBtn} />
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
