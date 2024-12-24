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
  SelectTrigger,
  SelectContent,
} from "@/components/ui";
import { useEditCampaign, useIpfs } from "@/hooks";
import { getIpfsHashFromUrl } from "@/lib/utils";
import { Campaign } from "@/types";

const formSchema = z.object({
  title: z.string().nonempty("Required"),
  category: z.string().nonempty("Required"),
  description: z.string().nonempty("Required"),
  targetAmount: z.string().nonempty("Required"),
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
      image: getIpfsHashFromUrl(campaign.image),
    },
  });

  const onSubmit = async ({
    title,
    category,
    description,
    image,
    targetAmount,
  }: z.infer<typeof formSchema>) => {
    const { IpfsHash, status } = await onUploadToIpfs({ file: image });

    if (status !== 200) return;

    await onEditCampaign({
      campaignAddress: campaign.address,
      title,
      category,
      description,
      image: IpfsHash,
      targetAmount,
    });
  };

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
