import {
  getTodos as getTodosFromDataAccess,
  getTodoById as getTodoByIdFromDataAccess,
  createTodo as createTodoInDataAccess,
  updateTodo as updateTodoInDataAccess,
  deleteTodo as deleteTodoInDataAccess,
} from "@/data-access/todos";

export async function getTodos() {
  const todos = await getTodosFromDataAccess();
  return todos.slice(0, 5);
}

export async function getTodoById(id: number) {
  return getTodoByIdFromDataAccess(id);
}

export async function createTodo(todo: { title: string; completed: boolean }) {
  return createTodoInDataAccess(todo);
}

export async function updateTodo(id: number) {
  return updateTodoInDataAccess(id);
}

export async function deleteTodo(id: number) {
  return deleteTodoInDataAccess(id);
}
