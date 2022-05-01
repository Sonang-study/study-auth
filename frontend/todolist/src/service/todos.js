export default class ToDoService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async viewDayTodos(userId = '1') {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${userId}/task-day`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async addTodo(dayPlan, userId = '1') {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${userId}/task-day`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        dayPlan,
      }),
    });
    return data;
  }

  async finishedTodo(taskId, userId = '1', dayPlan = 'did') {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${userId}/task-day/${taskId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        finishedAt: Date.now().toString(),
        dayPlan,
      }),
    });
    return data;
  }

  async modifyTodo(taskId, userId, dayPlan) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${userId}/task-day/${taskId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        finishedAt: Date.now().toString(),
        dayPlan,
      }),
    });
    return data;
  }

  async deleteTodo(taskId, userId) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${userId}/task-day/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}
