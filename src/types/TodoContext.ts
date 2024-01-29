import { Todo } from './Todo';

export type Context = {
  todos: Todo[],
  createTodo: (title: string, priority: number) => void,
  removeTodo: (todoId: string) => void,
  updateTodo: (todo: Todo) => void,
  toggleAll: (completed: boolean) => void,
  clearCompleted: () => void,
};