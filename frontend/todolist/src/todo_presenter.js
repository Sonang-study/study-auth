export default class TodoPresenter {
  constructor(todoService, userId = '2') {
    this.userId = userId;
    this.todoService = todoService;
    this.todos = [];
  }

  getTodos = async () => {
    return await this.todoService.viewDayTodos(this.userId);
  };

  add = async (todo, setTodos) => {
    setTodos([
      { id: Date.now(), finishedAt: null, dayPlan: todo },
      ...this.todos,
    ]);
    await this.todoService.addTodo(todo);
    await this.todoService.viewDayTodos().then((data) => setTodos(data));
  };

  delete = (key, setTodos) => {
    const newTodos = this.todos.filter(
      (todo) => String(todo.id) !== String(key)
    );
    setTodos(newTodos);
  };

  finish = async (key, dayPlan, setTodos) => {
    const newTodos = this.todos.map((todo) => {
      if (String(todo.id) === String(key)) {
        todo.finishedAt = todo.finishedAt ? null : Date.now();
      }
      return todo;
    });
    setTodos(newTodos);
    await this.todoService.finishedTodo(key, dayPlan);
  };
}
