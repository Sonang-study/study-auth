export default class TodoPresenter {
  constructor(todoService, userId = '1') {
    this.userId = userId;
    this.todoService = todoService;
    this.todos = [];
  }

  async getTodos() {
    await this.todoService
      .viewDayTodos(this.userId)
      .then((todo) => (this.todos = todo));
    return this.todos;
  }

  async add(todo, setTodos) {
    setTodos([
      { id: Date.now(), finishedAt: null, dayPlan: todo },
      ...this.todos,
    ]);
    await this.todoService.addTodo(todo);
    await this.todoService.viewDayTodos().then((data) => setTodos(data));
  }

  delete(key, setTodos) {
    const newTodos = this.todos.filter(
      (todo) => String(todo.id) !== String(key)
    );
    setTodos(newTodos);
  }

  async finish(key, dayPlan, setTodos) {
    const newTodos = this.todos.map((todo) => {
      if (String(todo.id) === String(key)) {
        todo.finishedAt = todo.finishedAt ? null : Date.now();
      }
      return todo;
    });
    setTodos(newTodos);
    await this.todoService.finishedTodo(key, dayPlan);
  }
}
