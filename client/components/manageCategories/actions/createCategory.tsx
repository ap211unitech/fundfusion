"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";

import {
  Form,
  Input,
  Button,
  Dialog,
  FormItem,
  FormField,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  FormControl,
  FormMessage,
} from "@/components/ui";
import { useAddCategory } from "@/hooks";

const formSchema = z.object({
  category: z.string().nonempty("Required"),
});

export const CreateCategory = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const { mutateAsync: onAddCategory, isPending } = useAddCategory();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await onAddCategory({
      ...values,
      cb: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-medium text-primary">
            <Plus className="h-4 w-4 stroke-[3px]" />
            Create new category
          </DialogTitle>
          <DialogDescription>
            Creating a new category adds it to the smart contract, allowing
            users to choose it when setting up their campaigns.
          </DialogDescription>
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
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
