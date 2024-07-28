"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTodo } from "@/use-cases/todos";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const isSubmitDisabled = () => {
    const modifiedFields = Object.keys(form.formState.dirtyFields);
    return modifiedFields.length === 0 || !form.formState.isValid;
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="col-span-3">
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
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-center col-span-1">
            <Button disabled={isSubmitDisabled()} type="submit">
              Submit
            </Button>
          </div>
        </div>
        <div>
          {form.formState.errors.title && (
            <FormMessage>{form.formState.errors.title.message}</FormMessage>
          )}
        </div>
      </form>
    </Form>
  );
}
