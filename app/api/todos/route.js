import { NextResponse } from "next/server";
import db from "@/utils/db";
export const GET = async (request) => {
  const todos = await db.todo.findMany();
  return NextResponse.json({ data: todos });
};

export const POST = async (request) => {
  const data = await request.json();
  const todo = await db.todo.create({
    data: {
      content: data.content,
    },
  });
  return NextResponse.json({ message: "Todo added successfully" });
};

export const PUT = async (request) => {
  const data = await request.json();
  const todo = await db.todo.update({
    where: {
      id: data.id,
    },
    data: {
      isCompleted: true,
    },
  });
  return NextResponse.json({ message: "Todo completed successfully" });
};
