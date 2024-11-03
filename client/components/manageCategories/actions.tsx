"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  category: z.string().nonempty("Required"),
});

export const CreateCategory = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = ({ category }: z.infer<typeof formSchema>) => {
    console.log(category);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Plus className="h-4 w-4" />
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
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const EditCategory = () => {
  return (
    <Button size="sm" className="flex items-center gap-1">
      <Edit className="h-4 w-4" /> Edit
    </Button>
  );
};
