"use client";

import { CalendarIcon, Edit, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEditCampaign, useIpfs } from "@/hooks";
import { Campaign } from "@/types";

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

export const EditCampaignForm = ({
  campaign,
  categories,
}: {
  campaign: Campaign;
  categories: string[];
}) => {
  const { mutateAsync: onEditCampaign, isPending: isEditingCampaign } =
    useEditCampaign();
  const { mutateAsync: onUploadToIpfs, isPending: isUploadingToIpfs } =
    useIpfs();

  const isPending = useMemo(
    () => isEditingCampaign || isUploadingToIpfs,
    [isEditingCampaign, isUploadingToIpfs],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: campaign.title,
      category: campaign.category,
      description: campaign.description,
      targetAmount: campaign.targetAmount.toString(),
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-20 space-y-6">
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
          className="flex items-center gap-2"
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
  );
};
