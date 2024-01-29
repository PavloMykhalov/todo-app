import { useState } from 'react';
import { Status } from '../types/Status';

type FilterItem = {
  label: string,
  value: Status,
  width: number,
};

const filters: FilterItem[] = [
  { label: 'All', value: Status.ALL, width: 100 },
  { label: 'Active', value: Status.ACTIVE, width: 100 },
  { label: 'Completed', value: Status.COMPLETED, width: 100 },

];

type Props = {
  setFilter: (type: Status) => void,
  setSortOrder: (order: string) => void,
};

export const TodosFilter: React.FC<Props> = ({ setFilter, setSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <ul
      className="flex items-center justify-center gap-[30px] mb-[15px] h-[30px]"
      data-cy="todosFilter"
    >
      {filters.map(({ label, value, width }) => (
        <button
          type="button"
          onClick={() => setFilter(value)}
          key={label}
          className={`flex flex-shrink-0 bg-white cursor-pointer items-center justify-center rounded-md w-[${width}px] 
          text-center border-slate-300 border hover:border-slate-500 active:bg-slate-400 focus:bg-slate-500; duration-[0.3s]`}
        >
          {label}
        </button>
      ))}

      <li className="flex bg-white items-center justify-center rounded-md w-[100px] flex-shrink-0 text-center border-slate-300 border hover:border-slate-500 duration-[0.3s] relative">
        <button
          className="h-full w-full outline-none"
          onClick={toggleDropdown}
        >
          <span className="text-gray-700">Priority</span>
          {isOpen && (
            <div className="absolute shadow h-[100px] bg-white cursor-pointer">
              <button
                className="h-[50px] hover:bg-gray-100 w-full"
                onClick={() => setSortOrder('asc')}
              >
                Ascending
              </button>

              <button
                className="h-[50px] hover:bg-gray-100 w-full"
                onClick={() => setSortOrder('desc')}
              >
                Descending
              </button>
            </div>
          )}
        </button>
      </li>
    </ul>
  );
};