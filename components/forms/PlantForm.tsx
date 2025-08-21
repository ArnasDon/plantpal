"use client";
import React, { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { createPlant } from "@/lib/actions/plant.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SpeciesForm from "./SpeciesForm";
import { getSpecies } from "@/lib/actions/species.actions";

const formSchema = z.object({
  speciesId: z.string().min(1, { message: "Species is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  notes: z.string().optional(),
  wateringFrequencyOverride: z.number().optional(),
});

const PlantForm = () => {
  const [species, setSpecies] = useState<Species[]>([]);

  const fetchSpecies = async () => {
    const species = await getSpecies();
    setSpecies(species);
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      speciesId: "",
      name: "",
      notes: undefined,
      wateringFrequencyOverride: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submitting");
    console.log(values);
    const plant = await createPlant(values);
    console.log("plant created");
    console.log(plant);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add a new plant species</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. That plant in the corner, Bob, Spikey"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speciesId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species</FormLabel>
                <div className="flex flex-row gap-2">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a species" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-200">
                        {species?.map((species) => (
                          <SelectItem key={species.id} value={species.id}>
                            {species.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <Button onClick={() => setIsOpen(true)}>New Species</Button>
                </div>
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
                    placeholder="e.g. In direct sunlight, make sure to check the soil often"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wateringFrequencyOverride"
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-dark-200">
          <DialogTitle>New Species</DialogTitle>
          <SpeciesForm setIsOpen={setIsOpen} fetchSpecies={fetchSpecies} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlantForm;
