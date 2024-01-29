import {
  useContext, useState, useRef, useEffect,
} from 'react';
import { TodosContext } from '../components/TodosContext';
import { Todo } from '../types/Todo';
import Image from 'next/image';
import iconDelete from '../icons/icon-delete.svg';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const {
    removeTodo,
    updateTodo
  } = useContext(TodosContext);

  const { id, title, completed, priority } = todo;

  return (
    <li
      className="flex items-center justify-between py-[12px] px-[8px] cursor-pointer border rounded-full"
    >
      <label className="flex justify-between cursor-pointer">
        <div className="flex gap-[15px]">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            onChange={() => updateTodo(todo)}
            checked={completed}
          />
          <span>
            {priority}
          </span>
          <span className={`${completed && 'line-through'}`}>
            {title}
          </span>
        </div>
      </label>

      <button
          type="button"
          className="flex hover:bg-slate-300 rounded-full duration-[0.3s]"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => removeTodo(id)}
        >
          <Image
            src={iconDelete}
            width={24}
            height={24}
            alt="delete todo"
          />
        </button>
    </li>
  );
};