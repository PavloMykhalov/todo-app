'use client'

import PriorityButton from "@/components/PriorityButton";
import TodoList from "@/components/TodoList";
import { TodosContext } from "@/components/TodosContext";
import { TodosFilter } from "@/components/TodosFilter";
import { Status } from "@/types/Status";
import { debounce } from "lodash";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import iconSearch from '../../icons/icon-search.svg';

export default function TodosPage() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [filter, setFilter] = useState(Status.ALL);
  const [sortOrder, setSortOrder] = useState('asc');
  const { todos, createTodo } = useContext(TodosContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const field = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (field.current && isExpanded) {
      field.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setQuery('');
  }, [setQuery]);

  const getVisibleTodos = useCallback(() => {
    let currentTodos = [...todos];

    currentTodos = currentTodos.sort((todo1, todo2) => {
      switch (sortOrder) {
        case 'desc':
          return todo2.priority - todo1.priority;

        default:
          return todo1.priority - todo2.priority;
      }
    });

    if (query) {
      currentTodos = currentTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      })
    }

    if (filter) {
      switch (filter) {
        case Status.ACTIVE:
          return currentTodos.filter(todo => !todo.completed);

        case Status.COMPLETED:
          return currentTodos.filter(todo => todo.completed);

        default:
          return currentTodos;
      }
    }

    return currentTodos;
  }, [todos, query, sortOrder, filter]);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      createTodo(trimmedTitle, priority);
    }

    setTitle('');
    setPriority(1);
  }

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };



  const visibleTodos = getVisibleTodos();

  return (
    <div className="flex items-center max-h-screen w-[100%] p-[10px]">
      <div
        className="flex flex-col bg-white w-[100%] max-w-[540px] 
            mt-[100px] mb-[20px] mx-auto 
            pt-[40px] px-[30px] pb-[70px] rounded-xl"
      >
        <div className="flex justify-between">
          <h1 className="mb-[20px] font-bold text-xl">TODO list</h1>
          <div>
            <button onClick={toggleSearch}>
              {!isExpanded && (
                <Image 
                  src={iconSearch} 
                  alt="search for tasks" 
                  width={24} 
                  height={24} 
                />
              )}
            </button>
            {isExpanded && (
              <input
                ref={field}
                type="text"
                className={`outline-none border border-slate-300 px-[10px]
            rounded-md opacity-100 transition-all duration-[0.3s]`}
                value={query}
                onChange={handleQueryChange}
                onBlur={() => setIsExpanded(false)}
              />
            )}
          </div>
        </div>

        <form
          action="/todos"
          method="post"
          onSubmit={handleFormSubmit}
          className="flex items-center justify-between relative mb-[25px] rounded-full bg-slate-300"
        >
          <input
            type="text"
            data-cy="createTodo"
            className="border-box flex-1 h-[50px] pl-[10px] border border-slate-300 
              rounded-l-full outline-none bg-slate-300 hover:border-slate-400 duration-[0.3s]"
            placeholder="Add your task"
            required
            value={title}
            onChange={event => setTitle(event.target.value)}
          >
          </input>

          <PriorityButton setPriority={setPriority} priority={priority} />

          <button
            type="submit"
            className="bg-amber-500 w-[100px] h-[50px] rounded-r-full 
            top-0 right-0 text-white hover:bg-amber-600 duration-[0.3s]"
          >
            Create
          </button>
        </form>

        {todos.length > 0 && (
          <>
            <TodosFilter
              setFilter={setFilter}
              setSortOrder={setSortOrder}
            />
            <TodoList todos={visibleTodos} />
          </>
        )}
      </div>
    </div>
  );
}
