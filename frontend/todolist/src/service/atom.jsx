import { atom, selector } from 'recoil';
import GroupPresenter from '../presenter/group_presenter';

const groupPresenter = new GroupPresenter();

export const toDosState = atom({
  key: 'toDos',
  default: [],
  //defulat에 처음 띄워질 toDo 값선택
});

export const groupState = atom({
  key: 'groups',
  default: [],
  //default에 처음 띄워질 그룹목록
});

export const membersState = atom({
  key: 'members',
  default: [],
  //default에 처음 띄워질 유저들 목록
});

export const toDoSelector = selector({
  key: 'toDosselector',
  get: ({ get }) => get(toDosState),
  set: ({ set }, newValue) => {
    console.log(newValue);
    set(toDosState, newValue);
  },
});

export const usersSelector = selector({
  key: 'users',
  get: ({ get }) => get(membersState),
  set: ({ set }, newValue) => {
    //group을 클릭했을때 그걸 받아와서 그 유저들을 출력
    set(membersState, newValue);
  },
});
