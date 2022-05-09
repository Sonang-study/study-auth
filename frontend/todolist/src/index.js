import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { RecoilRoot } from 'recoil';
import TokenStorage from './db/token';
import HttpClient from './network/http';
import AuthService from './service/auth';
import ToDoService from './service/todos';
import TodoPresenter from './presenter/todo_presenter';
import GroupService from './service/group';
import GroupPresenter from './presenter/group_presenter';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient, tokenStorage);
const todoService = new ToDoService(httpClient, tokenStorage);
const groupService = new GroupService(httpClient, tokenStorage);
const todoPresenter = new TodoPresenter(todoService);
const groupPresenter = new GroupPresenter(groupService);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App
        authService={authService}
        tokenStorage={tokenStorage}
        todoPresenter={todoPresenter}
        groupPresenter={groupPresenter}
      />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
