import React, { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './groups.module.css';
import Group from '../group/group';
import { groupState, selectedGroupState } from '../../service/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Groups = memo(({ groupPresenter, onPopupClick }) => {
  const [groups, setGroups] = useRecoilState(groupState);
  const setSelectedGroup = useSetRecoilState(selectedGroupState);

  useEffect(async () => {
    await groupPresenter.getMyGroup().then((group) => {
      setSelectedGroup(group[0]);
      setGroups(group);
    });
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
        {groups.map((group) => (
          <Group groupPresenter={groupPresenter} key={group.id} group={group} />
        ))}
      </section>
    </div>
  );
});

export default Groups;
