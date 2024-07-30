"use server";
import { fetchIdToken } from "@/lib/auth/server";
import { Todo, TodoSchema } from "./models/todo.model";
import { revalidatePath } from "next/cache";

const BASE_PATH = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const session = await fetchIdToken();
  if (!session) {
    throw new Error("User is not authenticated");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${session.toString()}`,
  };

  return fetch(url, { ...options, headers });
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetchWithAuth(`${BASE_PATH}/todos`);
  const res = await response.json();
  return TodoSchema.array().parse(res);
}

export async function getTodoById(id: number): Promise<Todo> {
  const response = await fetchWithAuth(`${BASE_PATH}/todos/${id}`);
  const res = await response.json();
  return TodoSchema.parse(res);
}

export async function createTodo(todo: { title: string }): Promise<Todo> {
  const response = await fetchWithAuth(`${BASE_PATH}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  const res = await response.json();
  const resTodo = TodoSchema.parse(res);
  revalidatePath("/todos");
  return resTodo;
}

export async function updateTodo(id: number): Promise<Todo> {
  const response = await fetchWithAuth(`${BASE_PATH}/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  const resTodo = TodoSchema.parse(res);
  revalidatePath("/todos");
  return resTodo;
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetchWithAuth(`${BASE_PATH}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  revalidatePath("/todos");
}
