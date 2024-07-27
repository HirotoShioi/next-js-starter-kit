import { Todo, TodoSchema } from "./models/todo.model";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const res = await response.json();
  return TodoSchema.array().parse(res);
}

export async function getTodoById(id: number): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  );
  const res = await response.json();
  return TodoSchema.parse(res);
}

export async function createTodo(todo: {
  title: string;
  completed: boolean;
}): Promise<Todo> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const res = await response.json();
  return TodoSchema.parse(res);
}

export async function updateTodo(id: number): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );
  const res = await response.json();
  return TodoSchema.parse(res);
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
