import TodoPresenter from '../todo_presenter';

describe('TodoPresenter', () => {
  const todos = [
    { id: '12343', finishedAt: null, dayPlan: 'running' },
    { id: '232345', finishedAt: null, dayPlan: 'studying' },
    { id: '4235709', finishedAt: null, dayPlan: 'fucking' },
  ];
  let presenter;
  let todoService;

  beforeEach(() => {
    todoService = {
      viewDayTodos: jest.fn(() => todos),
      addTodo: jest.fn(() => todos),
      finishedTodo: jest.fn(() => todos),
    };
    presenter = new TodoPresenter(todoService);
  });

  it('inits with todos', async () => {});
});
