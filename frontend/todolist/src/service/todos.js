export default class ToDoService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async viewDayTodos(userId, date) {
    console.log(userId,date, "viewDayToDos")
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/detail?userId=${userId}&date=${date}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getTodo(userId){
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/tasks/${userId}/task-day`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async addTodo(dayPlan, taskId) {
    const token = this.tokenStorage.getToken();
    
    const data = await this.http.fetch(`/tasks/${taskId}/task-day`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        dayPlan,
      }),
    });
    return data;
  }

  async finishedTodo(taskId, userId, dayPlan = 'did') {
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
