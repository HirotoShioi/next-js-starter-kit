import CreateTodoForm from "@/components/CreateTodoForm/create-todo-form";
import ProtectedPage from "@/components/ProtectedPage/protected-page";
import { TodoItem } from "@/components/TodoItem/todo-item";
import { cn } from "@/lib/utils";
import { pageWrapperStyles } from "@/styles/common";
import { getTodos } from "@/use-cases/todos";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function LoadTodos() {
  const todos = await getTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo.id} />
      ))}
    </ul>
  );
}
export default async function Page() {
  const t = await getTranslations();
  return (
    <ProtectedPage>
      <div className={cn(pageWrapperStyles, "space-y-8")}>
        <h1 className="text-2xl">{t("todos")}</h1>
        <CreateTodoForm />
        <Suspense>
          <LoadTodos />
        </Suspense>
      </div>
    </ProtectedPage>
  );
}
