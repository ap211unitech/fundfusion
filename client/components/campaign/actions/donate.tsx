"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Info, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { z } from "zod";

import {
  Form,
  Input,
  Alert,
  Button,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
  AlertDescription,
} from "@/components/ui";
import { Campaign } from "@/types";
import { useDonateCampaign } from "@/hooks";

const formSchema = z.object({
  amountToDonate: z
    .string()
    .nonempty("Required")
    .refine(
      (a) => (a.split(".").at(1)?.length || 0) <= 4,
      "Max 4 digits allowed after decimal",
    )
    .refine((a) => Number(a) > 0, "Amount must be more than 0"),
});

export const DonateToCampaign = ({ campaign }: { campaign: Campaign }) => {
  const { mutateAsync: onDonateToCampaign, isPending } = useDonateCampaign();

  const isTargetAmountMet = useMemo(
    () => campaign.totalRaisedAmount >= campaign.targetAmount,
    [campaign.targetAmount, campaign.totalRaisedAmount],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountToDonate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) =>
    await onDonateToCampaign({ campaignAddress: campaign.address, ...values });

  if (isTargetAmountMet) {
    return (
      <Alert variant="info" className="flex items-center">
        <div>
          <Info className="mr-2 h-4 w-4" />
        </div>
        <AlertDescription>
          This campaign has raised the desired amount of money.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start space-x-3"
      >
        <FormField
          control={form.control}
          name="amountToDonate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="number" placeholder="10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Donating...
            </>
          ) : (
            <>
              <Heart className="h-4 w-4" />
              Donate
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
