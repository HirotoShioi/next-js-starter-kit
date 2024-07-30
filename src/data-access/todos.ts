"use server";
import { fetchIdToken } from "@/lib/auth/server";
import { Todo, TodoSchema } from "./models/todo.model";

const BASE_PATH = process.env.NEXT_PUBLIC_API_URL;
export async function getTodos(): Promise<Todo[]> {
  const session = await fetchIdToken();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const response = await fetch(`${BASE_PATH}/todos`, {
    headers: {
      Authorization: `Bearer ${session.toString()}`,
    },
  });
  const res = await response.json();
  console.log(res);
  return TodoSchema.array().parse(res);
}

export async function getTodoById(id: number): Promise<Todo> {
  const session = await fetchIdToken();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const response = await fetch(`${BASE_PATH}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${session.toString()}`,
    },
  });
  const res = await response.json();
  return TodoSchema.parse(res);
}

export async function createTodo(todo: { title: string }): Promise<void> {
  const session = await fetchIdToken();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const response = await fetch(`${BASE_PATH}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.toString()}`,
    },
  });
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to create todo");
  }
}

export async function updateTodo(id: number): Promise<Todo> {
  const session = await fetchIdToken();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const response = await fetch(`${BASE_PATH}/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.toString()}`,
    },
  });
  const res = await response.json();
  return TodoSchema.parse(res);
}

export async function deleteTodo(id: number): Promise<void> {
  const session = await fetchIdToken();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const response = await fetch(`${BASE_PATH}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.toString()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
