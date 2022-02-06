import React from 'react';
import styles from "./member.module.css"

const Member = ({ member }) => {
  return <div className={styles.member}>{member.name}</div>;
};

export default Member;
