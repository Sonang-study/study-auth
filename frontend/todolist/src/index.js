import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import TokenStorage from './db/token';
import HttpClient from './network/http';
import AuthService from './service/auth';
import ToDoService from './service/todos';
import TodoPresenter from './todo_presenter';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient, tokenStorage);
const todoService = new ToDoService(httpClient, tokenStorage);
const todoPresenter = new TodoPresenter(todoService);

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      tokenStorage={tokenStorage}
      todoService={todoService}
      todoPresenter={todoPresenter}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
