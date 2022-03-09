import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import TokenStorage from './db/token';
import { AuthErrorEventBus } from './network/authErrorEventBus';
import HttpClient from './network/http';
import AuthService from './service/auth';
import ToDoService from './service/todos';

const baseURL = 'http://3.38.35.213/api/v1';
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const todoService = new ToDoService(httpClient, tokenStorage);

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} tokenStorage={tokenStorage} todoService={todoService} />
  </React.StrictMode>,
  document.getElementById('root')
);
