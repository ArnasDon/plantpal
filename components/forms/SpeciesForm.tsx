"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { createSpecies } from "@/lib/actions/species.actions";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  tips: z.array(z.string()),
  wateringFrequencyDays: z.number().min(0.1, {
    message: "Watering frequency must be at least 0.1 days",
  }),
});

const SpeciesForm = ({
  setIsOpen,
  fetchSpecies,
}: {
  setIsOpen: (isOpen: boolean) => void;
  fetchSpecies: () => void;
}) => {
  const [tips, setTips] = useState<string[]>([]);
  const [tipInput, setTipInput] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tips: [""],
      wateringFrequencyDays: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("submitting");
    values.tips = tips;
    // console.log(values);
    const result = await createSpecies(values);
    if (result.success) {
      fetchSpecies();
      setIsOpen(false);
    } else {
      setError(result.error as string);
    }
  };

  const handleAddTip = () => {
    if (tipInput.trim()) {
      setTips([...tips, tipInput.trim()]);
      setTipInput(""); // Clear the input after adding
    }
  };

  const handleRemoveTip = (index: number) => {
    setTips(tips.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-8 px-12 py-8">
      <h2 className="text-2xl font-bold">Add a new plant species</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Peace Lily"
                    {...field}
                    className="bg-dark-200 border-dark-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormLabel>Tips</FormLabel>
            {tips.map((tip, index) => (
              <div key={index} className="flex items-center gap-2 w-fit">
                <span className="flex-1">{tip}</span>
                <button onClick={() => handleRemoveTip(index)}>
                  <Image
                    src="/icons/trash.svg"
                    alt="Close"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            ))}
            <div className="flex gap-2 items-end">
              <Input
                placeholder="e.g. Likes shady places"
                value={tipInput}
                onChange={(e) => setTipInput(e.target.value)}
                className="bg-dark-200 border-dark-300"
              />
              <Button type="button" onClick={handleAddTip}>
                Add Tip
              </Button>
              <FormMessage />
            </div>
          </div>
          <FormField
            control={form.control}
            name="wateringFrequencyDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Watering Frequency (days)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    className="bg-dark-200 border-dark-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SpeciesForm;
