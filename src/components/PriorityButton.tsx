import React, { useState } from 'react';

type PriorityButtonProps = {
  setPriority: (priority: number) => void;
  priority: number,
};

export default function PriorityButton({ setPriority, priority }: PriorityButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handlePriorityChange = (priority: number) => {
    setPriority(priority);
    setPriority(priority);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {isOpen && (
        <div className="absolute mt-2 p-2 bg-white border rounded shadow">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((priority) => (
            <button
              key={priority}
              onClick={() => handlePriorityChange(priority)}
              className="text-center block w-full px-4 py-2 hover:bg-gray-100"
            >
              {priority}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 hover:bg-blue-600 h-[50px] text-white px-4 py-2 duration-[0.3s]"
      >
        Priority: {priority}
      </button>
    </div>
  );
};