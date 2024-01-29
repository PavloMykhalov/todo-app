'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center max-w-[800px]">
      <h1 className="text-xl xl:text-6xl">Get things done with TODO</h1>
      <Link 
        href="/todos" 
        className="flex items-center justify-center h-[70px] w-[250px] xl:w-[400px] xl:h-[100px] bg-gray-600 hover:bg-gray-800 
        rounded-full text-white duration-[0.3s]"
      >
        <p className="text-lg xl:text-4xl">Get Started</p>
      </Link>
    </div>
  );
};