import React from 'react';
import styles from "./member.module.css"


const Member = ({ member }) => {
  return <div className={styles.member}>{member.firstName}</div>;
};

export default Member;
