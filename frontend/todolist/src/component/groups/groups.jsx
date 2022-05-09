import React, { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './groups.module.css';
import Group from '../group/group';
import { groupState, usersSelector } from '../../service/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Groups = memo(({ groupPresenter, handleGroup, onPopupClick }) => {
  const [groups, setGroups] = useRecoilState(groupState);

  useEffect(async () => {
    await groupPresenter.getMyGroup().then((group) => setGroups(group));
  }, []);

  const onAddGroup = () => {
    onPopupClick();
  };

  return (
    <div className={styles.groups}>
      <section className={styles.btns}>
        <FontAwesomeIcon
          icon={faPlus}
          className={styles.plusBtn}
          onClick={onAddGroup}
        />
      </section>
      <section className={styles.group}>
        {groups.map((group, index) => (
          <Group groupPresenter={groupPresenter} key={index} group={group} />
        ))}
      </section>
    </div>
  );
});

export default Groups;
