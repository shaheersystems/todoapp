"use client";
import Header from "@/components/Header";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState("todo");
  const [done, setDone] = useState([]);
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    // fetch data from server
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodo(data.data.filter((todo) => todo.isCompleted === false));
      });
  }, [todo]);
  useEffect(() => {
    // fetch data from server
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setDone(data.data.filter((todo) => todo.isCompleted === true));
      });
  }, [todo]);
  return (
    <main>
      <Header />
      <div className="max-w-3xl px-5 m-auto md:p-0">
        <div className="py-6">
          <h1 className="text-3xl font-bold">All todos</h1>
        </div>
        <div className="flex items-center w-full gap-2">
          <button
            onClick={() => setFilter("todo")}
            className={`px-3 py-2 border-b ${
              filter === "todo" ? "text-white bg-black" : ""
            }`}
          >
            To do
          </button>
          <button
            className={`px-3 py-2 border-b ${
              filter === "done" ? "text-white bg-black" : ""
            }`}
            onClick={() => setFilter("done")}
          >
            Completed
          </button>
        </div>
        {filter === "todo" &&
          todo.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                isCompleted={todo.isCompleted}
              />
            );
          })}
        {filter === "done" &&
          done.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                isCompleted={todo.isCompleted}
              />
            );
          })}
      </div>
    </main>
  );
}
