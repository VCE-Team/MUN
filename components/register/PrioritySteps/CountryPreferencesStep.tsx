"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { PriorityRegistrationSchema } from "@/schemas/priorityRegistrationForm";

interface CountryPreferencesStepProps {
  control: Control<PriorityRegistrationSchema>;
}

export function CountryPreferencesStep({
  control,
}: CountryPreferencesStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground/90">
        Country Preferences
      </h3>
      <p className="text-sm text-muted-foreground">
        Select your country preferences in order of priority.
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        <FormField
          control={control}
          name="firstPreferenceCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                1st Preference Country *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="First choice"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="secondPreferenceCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                2nd Preference Country *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="Second choice"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="thirdPreferenceCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                3rd Preference Country *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="Third choice"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
