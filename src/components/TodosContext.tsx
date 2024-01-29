'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { Context } from '../types/TodoContext';
import { Todo } from '../types/Todo';
import * as api from '../api/todos';

export const TodosContext = React.createContext<Context>({
  todos: [],
  createTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function TodosProvider({ children }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = () => api.getAll().then(setTodos);

  useEffect(() => {
    loadTodos()
  }, []);

  const value = useMemo(() => ({
    createTodo: async (title: string, priority: number) => {
      const newTodo: Todo = await api.add(title, priority);

      setTodos([...todos, newTodo]);
    },

    removeTodo: async (todoId: string) => {
      await api.remove(todoId);
      loadTodos();
    },

    updateTodo: async (todo: Todo) => {
      await api.update(todo);
      loadTodos();
    },

    toggleAll: (completed: boolean) => {
      const toUpdate = todos.filter(todo => todo.completed !== completed);

      api.updateAll(toUpdate.map(todo => ({ ... todo, completed })))
        .then(() => loadTodos());
    },

    clearCompleted: () => {
      api.deleteAll(
        todos.filter(todo => todo.completed)
      ).then(() => loadTodos());
    },

    todos,

  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};