import React from 'react';
import styles from './addGroup.module.css';

const namelist = [
  { name: 'Sonang' },
  { name: '405' },
  { name: 'DongDaemoon' },
  { name: 'What' },
  { name: 'SHINKO' },
  { name: 'Sonang' },
  { name: '405' },
];

const addGroup = (props) => {
  return (
    <section className={styles.addPopup}>
      <form action='submit' className={styles.popup_form}>
        <input
          type='text'
          className={styles.popup_input}
          placeholder='add Group name...'
        />
        <input type='submit' className={styles.popup_submit} />
      </form>

      <ul className={styles.popup_list}>
        {namelist.map((list) => (
          <li className={styles.popup_item}>{list.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default addGroup;
