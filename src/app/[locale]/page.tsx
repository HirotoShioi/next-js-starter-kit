import CreateTodoForm from "@/components/CreateTodoForm/create-todo-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Todo } from "@/data-access/models/todo.model";
import { getTodos } from "@/use-cases/todos";
import { getTranslations } from "next-intl/server";

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
    </li>
  );
}

export default async function Page() {
  const t = await getTranslations();
  const todos = await getTodos();
  return (
    <div className="container">
      <h1 className="text-2xl pt-4">{t("todos")}</h1>
      <CreateTodoForm />
      <ul className="">
        {todos.map((todo) => (
          <TodoItem {...todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}
