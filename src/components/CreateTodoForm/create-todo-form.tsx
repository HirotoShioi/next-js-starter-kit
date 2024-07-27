"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTodo } from "@/use-cases/todos";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CreateTodoForm() {
  const formSchema = z.object({
    title: z.string().min(1),
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  function onSubmit(data: FormValues) {
    createTodo({
      title: data.title,
    });
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Title</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter the title of the todo item
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-center col-span-1">
            <Button type="submit" className="px-2 py-1">
              Create Todo
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
