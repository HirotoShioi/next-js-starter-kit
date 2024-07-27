import { getTodos } from "@/use-cases/todos";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  const todos = await getTodos();
  return (
    <div>
      <h1>{t("todos")}</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
