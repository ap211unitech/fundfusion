"use client";

import { CalendarIcon, Loader2, Plus, TriangleAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { format } from "date-fns";
import { useMemo } from "react";
import z from "zod";

import {
  Form,
  Input,
  Alert,
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
  UploadImage,
  FormMessage,
  SelectTrigger,
  SelectContent,
  PopoverTrigger,
  PopoverContent,
  AlertDescription,
} from "@/components/ui";
import { useCreateCampaign, useIpfs } from "@/hooks";

const formSchema = z.object({
  title: z
    .string()
    .nonempty("Required")
    .min(50, "Title must be at least 50 characters long"),
  categoryId: z.string().nonempty("Required"),
  description: z
    .string()
    .nonempty("Required")
    .min(100, "Title must be at least 100 characters long"),
  targetAmount: z
    .string()
    .nonempty("Required")
    .refine((a) => Number(a) > 0, "Amount must be more than 0")
    .refine(
      (a) => (a.split(".").at(1)?.length || 0) <= 4,
      "Max 4 digits allowed after decimal",
    ),
  targetTimestamp: z.date({
    required_error: "Required",
  }),
  image: z
    .array(
      z.custom<File>(
        (file) => file instanceof File && file.type.startsWith("image/"),
        {
          message: "Only image files are allowed.",
        },
      ),
    )
    .max(1, "You can only upload 1 image."),
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
      categoryId: "",
      description: "",
      targetAmount: "",
    },
  });

  const onSubmit = async ({
    title,
    categoryId,
    description,
    image,
    targetAmount,
    targetTimestamp,
  }: z.infer<typeof formSchema>) => {
    const { IpfsHash, status } = await onUploadToIpfs({
      file: image.at(0) as File,
    });

    if (status !== 200) return;

    await onCreateCampaign({
      title,
      categoryId: +categoryId,
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
              name="categoryId"
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
                          !form.getValues("categoryId") &&
                            "[&>span]:opacity-50",
                        )}
                      >
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c, index) => (
                          <SelectItem key={c} value={index.toString()}>
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
                  <FormLabel>Ending date</FormLabel>
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
                    <PopoverContent
                      align="start"
                      className="min-h-[325px] w-auto p-0"
                    >
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
          </div>

          <div className="!mt-2 md:!mt-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadImage
                      formField={field}
                      onDrop={(acceptedFiles) =>
                        form.setValue("image", acceptedFiles, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Alert variant="warning" className="flex items-center">
          <div>
            <TriangleAlert className="mr-2 h-4 w-4" />
          </div>
          <AlertDescription>
            Once the campaign is created, it&apos;s ending date cannot be
            modified. Please select the ending date carefully.
          </AlertDescription>
        </Alert>

        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 stroke-[2.5px]" />
              Create
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
