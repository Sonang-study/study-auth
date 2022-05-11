import { atom, selector } from 'recoil';
// import TokenStorage from '../db/token';
// import HttpClient from '../network/http';
// import GroupPresenter from '../presenter/group_presenter';
// import TodoPresenter from '../presenter/todo_presenter';
// import AuthService from './auth';
// import GroupService from './group';
// import ToDoService from './todos';

// const baseURL = process.env.REACT_APP_BASE_URL;
// const httpClient = new HttpClient(baseURL);
// const tokenStorage = new TokenStorage();
// const groupService = new GroupService(httpClient, tokenStorage);
// const authService = new AuthService(httpClient, tokenStorage);
// const todoService = new ToDoService(httpClient, tokenStorage);
// const groupPresenter = new GroupPresenter(groupService);
// const todoPresenter = new TodoPresenter(todoService);
// let whoAmI, myGroups;
// const initAtom = async () => {
//   console.log('init');
//   await authService.me().then((me) => {
//     whoAmI = me;
//   });

//   await groupPresenter.getMyGroup().then((me) => {
//     myGroups = me;
//   });
// };

export const selectedGroupState = atom({
  key: 'selectedGroup',
  default: 0,
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

export const toDosState = atom({
  key: 'toDos',
  default: [],
  //defulat에 처음 띄워질 toDo 값선택
});

export const usersSelector = selector({
  key: 'users',
  get: ({ get }) => get(membersState),
  set: ({ set }, newValue) => {
    //group을 클릭했을때 그걸 받아와서 그 유저들을 출력
    set(membersState, newValue);
  },
});

export const toDoSelector = selector({
  key: 'toDosselector',
  get: ({ get }) => get(toDosState),
  set: ({ set }, newValue) => {
    // console.log(newValue);
    set(toDosState, newValue);
  },
});
