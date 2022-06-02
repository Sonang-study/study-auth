export default class TodoPresenter {
  constructor(todoService, authService) {
    this.authService = authService;
    this.todoService = todoService;
    this.todos = [];
  }

  getTodos = async (userId, date) => {
    if (!userId) {
      const data = await this.authService.me();
      userId = data.id;
    }
    if (!date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);

      date = year + '-' + month + '-' + day;
    }
    console.log(userId, date);
    return await this.todoService.viewDayTodos(userId, date);
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
