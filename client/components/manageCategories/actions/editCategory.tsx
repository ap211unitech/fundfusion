"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  Input,
  Button,
  Dialog,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui";
import { useEditCategory } from "@/hooks";

const formSchema = z.object({
  category: z.string().nonempty("Required"),
});

export const EditCategory = ({
  category,
  categoryId,
}: {
  category: string;
  categoryId: number;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { category },
  });

  const { mutateAsync: onEditCategory, isPending } = useEditCategory();

  const onSubmit = async ({ category }: z.infer<typeof formSchema>) => {
    await onEditCategory({ categoryId, category, cb: () => form.reset() });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-medium text-primary">
            <Edit className="h-4 w-4 stroke-[2px]" />
            Edit category
          </DialogTitle>
          <DialogDescription>Edit the existing category</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Editing...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
