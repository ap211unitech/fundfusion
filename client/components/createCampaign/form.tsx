"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { format } from "date-fns";
import { useMemo } from "react";
import z from "zod";

import {
  Form,
  Input,
  Button,
  Select,
  Popover,
  Calendar,
  FormItem,
  Textarea,
  FormLabel,
  FormField,
  SelectItem,
  SelectValue,
  FormControl,
  FormMessage,
  SelectTrigger,
  SelectContent,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { useCreateCampaign, useIpfs } from "@/hooks";

const formSchema = z.object({
  title: z.string().nonempty("Required"),
  category: z.string().nonempty("Required"),
  description: z.string().nonempty("Required"),
  targetAmount: z.string().nonempty("Required"),
  targetTimestamp: z.date({
    required_error: "Required",
  }),
  image: z.any(),
});

export const CreateCampaignForm = ({
  categories,
}: {
  categories: string[];
}) => {
  const { mutateAsync: onCreateCampaign, isPending: isCreatingCampaign } =
    useCreateCampaign();
  const { mutateAsync: onUploadToIpfs, isPending: isUploadingToIpfs } =
    useIpfs();

  const isPending = useMemo(
    () => isCreatingCampaign || isUploadingToIpfs,
    [isCreatingCampaign, isUploadingToIpfs],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      targetAmount: "",
    },
  });

  const onSubmit = async ({
    title,
    category,
    description,
    image,
    targetAmount,
    targetTimestamp,
  }: z.infer<typeof formSchema>) => {
    const { IpfsHash, status } = await onUploadToIpfs({ file: image });

    if (status !== 200) return;

    await onCreateCampaign({
      title,
      category,
      description,
      image: IpfsHash,
      targetAmount,
      targetTimestamp,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-10">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="placeholder:opacity-50"
                      placeholder="Duis aute irure dolor in reprehenderit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      className="placeholder:opacity-50"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose category</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className={classNames(
                          "w-full",
                          !form.getValues("category") && "[&>span]:opacity-50",
                        )}
                      >
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-5 md:space-y-6">
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="0.0"
                      className="placeholder:opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetTimestamp"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Target timestamp</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={classNames(
                            "!mt-3 w-full pl-3 text-left font-normal",
                            !field.value
                              ? "text-muted-foreground"
                              : "opacity-80",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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
  );
};
