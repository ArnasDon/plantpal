"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPlantCompanion } from "@/lib/actions/companion.actions";
import { toast } from "sonner";

const formSchema = z.object({
  plantId: z.string().min(1, { message: "Plant is reuqired" }),
  companionId: z.string().min(1, { message: "Companion is required" }),
  notes: z.string().optional(),
});

const PlantForm = ({
  plantId,
  eligibleCompanions,
}: {
  plantId: string;
  eligibleCompanions: Plant[];
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plantId: plantId,
      companionId: "",
      notes: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await addPlantCompanion({
      plantId: values.plantId,
      companionId: values.companionId,
      notes: values.notes,
      path: `/plants/${plantId}`,
    });
    if (result.success) {
      toast.custom(() => (
        <div className="toast-success">
          <h3 className="font-semibold">Companion added successfully</h3>
        </div>
      ));
      form.reset();
    } else {
      toast.custom(() => (
        <div className="toast-error">
          <h3 className="font-semibold">Failed to add companion</h3>
          <p className="text-sm">{result.error as string}</p>
        </div>
      ));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="form-select">
                    <SelectValue placeholder="Select a plant" />
                  </SelectTrigger>
                  <SelectContent className="form-select-content">
                    {eligibleCompanions.map((plant) => (
                      <SelectItem key={plant.id} value={plant.id}>
                        {plant.name} - {plant.species?.name}
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Keep together in the sun"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Add Companion
        </Button>
      </form>
    </Form>
  );
};

export default PlantForm;
