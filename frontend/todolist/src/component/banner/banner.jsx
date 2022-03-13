import React, { memo } from 'react';
import styles from './banner.module.css';

const Banner = memo(({ text, isAlert }) => {
  return (
    <>
      {text && (
        <p
          className={styles.banner}
        >
          {text}
        </p>
      )}
    </>
  );
});

export default Banner;
