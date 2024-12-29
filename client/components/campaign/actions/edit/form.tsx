"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useMemo } from "react";
import z from "zod";

import {
  Form,
  Input,
  Button,
  Select,
  FormItem,
  Textarea,
  FormLabel,
  FormField,
  SelectItem,
  SelectValue,
  FormControl,
  FormMessage,
  UploadImage,
  SelectTrigger,
  SelectContent,
} from "@/components/ui";
import { useEditCampaign, useIpfs } from "@/hooks";
import { getIpfsHashFromUrl } from "@/lib/utils";
import { Campaign } from "@/types";

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
  image: z
    .array(
      z.custom<File | string>(
        (file) =>
          typeof file == "string" ||
          (file instanceof File && file.type.startsWith("image/")),
        {
          message: "Only image files are allowed.",
        },
      ),
    )
    .max(1, "You can only upload 1 image."),
});

export const EditCampaignForm = ({
  cb,
  campaign,
  categories,
}: {
  campaign: Campaign;
  categories: string[];
  cb: () => void;
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
      categoryId: categories.indexOf(campaign.category).toString(),
      description: campaign.description,
      targetAmount: campaign.targetAmount.toString(),
      image: [campaign.image],
    },
  });

  const onSubmit = async ({
    title,
    categoryId,
    description,
    image: formImage,
    targetAmount,
  }: z.infer<typeof formSchema>) => {
    const image = formImage[0];

    let IpfsHash: string;

    if (typeof image === "string") {
      IpfsHash = getIpfsHashFromUrl(image) as string;
    } else {
      const response = await onUploadToIpfs({ file: image });
      if (response.status !== 200) return;
      IpfsHash = response.IpfsHash;
    }

    await onEditCampaign({
      campaignAddress: campaign.address,
      title,
      categoryId: +categoryId,
      description,
      image: IpfsHash,
      targetAmount,
      cb,
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
          </div>

          <div className="!mt-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadImage
                      formField={field}
                      initialImagePreviewUrl={campaign.image}
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
