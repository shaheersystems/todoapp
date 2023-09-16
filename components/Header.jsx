"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const Header = ({}) => {
  const [content, setContent] = useState("");
  const [modal, setModal] = useState(false);
  const addTodoHandler = async () => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ content: content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.message);
    setContent("");
    setModal(false);
  };

  return (
    <div className="sticky top-0 flex items-center justify-between px-6 py-2 bg-white border-b">
      <div className="flex items-center gap-2">
        <svg
          aria-label="Vercel logomark"
          height="20"
          role="img"
          viewBox="0 0 74 64"
        >
          <path
            d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
            fill="black"
          ></path>
        </svg>
      </div>
      <div>
        <Dialog onOpenChange={() => setModal(!modal)} open={modal}>
          <DialogTrigger
            onClick={() => setModal(true)}
            className="flex items-center gap-2 p-2 text-sm text-white bg-black rounded-full hover:bg-black/80"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a brief description of your task</DialogTitle>
              <DialogDescription>
                <input
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  type="text"
                  placeholder="e.g. Buy groceries"
                  className="w-full px-3 py-2 mt-2 border rounded outline-blue-500"
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={() => addTodoHandler()}
                className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-black rounded hover:bg-black/80"
              >
                Add
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
