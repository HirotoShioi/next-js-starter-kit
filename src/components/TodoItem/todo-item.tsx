"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Todo } from "@/data-access/models/todo.model";
import { deleteTodo } from "@/use-cases/todos";
import { CircleX } from "lucide-react";

export function TodoItem(todo: Todo) {
  return (
    <li key={todo.id} className="flex items-center mb-2 border rounded-lg p-4">
      <Checkbox
        id={`todo-${todo.id}`}
        className="mr-2"
        checked={todo.completed}
      />
      <Label htmlFor={`todo-${todo.id}`} className="text-gray-800">
        {todo.title}
      </Label>
      <CircleX
        size={24}
        className="ml-auto cursor-pointer text-red-500"
        onClick={() => deleteTodo(todo.id)}
      />
    </li>
  );
}
