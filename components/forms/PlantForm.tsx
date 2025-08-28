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
import { createPlant, updatePlant } from "@/lib/actions/plant.actions";
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
import { redirect } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  speciesId: z.string().min(1, { message: "Species is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  notes: z.string().optional(),
  wateringFrequencyOverride: z.number().optional(),
});

const PlantForm = ({ plant }: { plant?: Plant }) => {
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
      speciesId: plant?.speciesId || "",
      name: plant?.name || "",
      notes: plant?.notes || "",
      wateringFrequencyOverride: plant?.wateringFrequencyOverride || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (plant) {
      const result = await updatePlant(plant.id, values);
      if (result.success) {
        toast.custom(() => (
          <div className="bg-primary rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
            <h3 className="font-semibold">Plant updated successfully</h3>
          </div>
        ));
        redirect(`/plants/${plant.id}`);
      } else {
        toast.custom(() => (
          <div className="bg-destructive rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
            <h3 className="font-semibold">Plant update failed</h3>
            <p className="text-sm">{result.error}</p>
          </div>
        ));
      }
    } else {
      const result = await createPlant(values);
      if (result.success) {
        toast.custom(() => (
          <div className="bg-primary rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
            <h3 className="font-semibold">Plant created successfully</h3>
          </div>
        ));
        redirect(`/plants/${result.data.id}`);
      } else {
        toast.custom(() => (
          <div className="bg-destructive rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
            <h3 className="font-semibold">Plant creation failed</h3>
            <p className="text-sm">{result.error}</p>
          </div>
        ));
      }
    }
  };

  return (
    <div className="px-20 py-8 max-w-[700px] mx-auto flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl font-semibold font-fraunces">
          {plant ? "Edit Plant" : "Add a new plant"}
        </h2>
        <p className="text-light-200">
          Keep track of your plants and give them the care they deserve.
        </p>
      </div>
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
                <div className="flex flex-row gap-2 max-lg:flex-col">
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Find the selected species and set watering frequency
                        const selectedSpecies = species.find(
                          (s) => s.id === value
                        );
                        if (selectedSpecies?.wateringFrequencyDays) {
                          form.setValue(
                            "wateringFrequencyOverride",
                            selectedSpecies.wateringFrequencyDays
                          );
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-dark-200 border-dark-300 focus-visible:ring-0 focus-visible:ring-offset-0 w-full">
                        <SelectValue placeholder="Select a species" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-200 border-dark-300">
                        {species?.map((species) => (
                          <SelectItem key={species.id} value={species.id}>
                            {species.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <Button
                    className="cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  >
                    New Species
                  </Button>
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
          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {plant ? "Edit Plant" : "Save Plant"}
          </Button>
        </form>
      </Form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-dark-100 border-dark-300 shadow-card">
          <DialogTitle>New Species</DialogTitle>
          <SpeciesForm setIsOpen={setIsOpen} fetchSpecies={fetchSpecies} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlantForm;
