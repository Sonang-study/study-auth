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
    console.log(data,"data")
    return data
  }

  async addTodo(dayPlan, dayId = '1') {
    const token = this.tokenStorage.getToken();
    await this.http.fetch(`/tasks/${dayId}/task-day`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        dayPlan,
      }),
    });
    console.log('SUCCESS ADD', dayId);
  }

  modifyTodo() {}

  deleteTodo() {}
}
