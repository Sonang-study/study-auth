import React from 'react';
import styles from "./member.module.css"


const Member = ({ handleUser, member }) => {
  const selectUser =(e)=>{
    handleUser(member.userId)
  }
  return <div onClick={selectUser} className={styles.member}>{member.firstName}</div>;
};

export default Member;
