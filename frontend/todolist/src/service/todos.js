export default class ToDoService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async viewDayTodos(dayId = '1') {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${dayId}/task-day`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async addTodo(dayPlan, userId = '1') {
    const token = this.tokenStorage.getToken();
    await this.http.fetch(`/tasks/${userId}/task-day`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        dayPlan,
      }),
    });
  }

  async finishedTodo(taskId, dayPlan="did", userId = '1') {
    const token = this.tokenStorage.getToken();
    await this.http.fetch(`/tasks/${userId}/task-day/${taskId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        finishedAt: Date.now().toString(),
        dayPlan,
      }),
    });
  }
  
  modifyTodo() {}

  deleteTodo() {}
}
