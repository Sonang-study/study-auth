import ToDoService from '../service/todos';
import TodoPresenter from '../todo_presenter';

jest.mock('../service/todos');

describe('TodoPresenter', () => {
  const todos = [
    { id: '12343', finishedAt: null, dayPlan: 'running' },
    { id: '232345', finishedAt: null, dayPlan: 'studying' },
    { id: '4235709', finishedAt: null, dayPlan: 'fucking' },
  ];
  let presenter;
  let todoService;

  beforeEach(() => {
    todoService = new ToDoService();
    presenter = new TodoPresenter(todoService);
  });

//   it('inits with todos', async () => {
//     expect(await presenter.getTodos()).toBe(todos);
//   });
});
