import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props) {
  return (
    <ul
      className="flex flex-col gap-[10px] mb-[15px]"
      data-cy="todoList"
    >
      {todos.map((todo: Todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
};