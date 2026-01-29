"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, UseFormReturn } from "react-hook-form";
import { PriorityRegistrationSchema } from "@/schemas/priorityRegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CountryPreferencesStepProps {
  control: Control<PriorityRegistrationSchema>;
  form: UseFormReturn<PriorityRegistrationSchema>;
}

const committeeNames: Record<string, string> = {
  disec: "DISEC",
  unhrc: "UNHRC",
  aippm: "AIPPM",
  ip: "International Press (IP)",
};

export function CountryPreferencesStep({
  control,
  form,
}: CountryPreferencesStepProps) {
  const firstCommittee = form.watch("firstPreferenceCommittee");
  const secondCommittee = form.watch("secondPreferenceCommittee");
  const thirdCommittee = form.watch("thirdPreferenceCommittee");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground/90 mb-2">
          Allocation Preferences
        </h3>
        <p className="text-sm text-muted-foreground">
          Select your allocation preferences for each committee in order of priority.
        </p>
      </div>

      {/* 1st Preference Committee */}
      <Card className="border-primary/20 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base break-words">
            <span className="block sm:inline">1st Preference Committee:</span>{" "}
            <span className="font-semibold">{firstCommittee ? committeeNames[firstCommittee] || firstCommittee : "Not selected"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={control}
              name="firstPreferenceCommittee1stCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    1st Allocation Preference *
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
              name="firstPreferenceCommittee2ndCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    2nd Allocation Preference *
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
              name="firstPreferenceCommittee3rdCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    3rd Allocation Preference *
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
        </CardContent>
      </Card>

      {/* 2nd Preference Committee */}
      <Card className="border-primary/20 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base break-words">
            <span className="block sm:inline">2nd Preference Committee:</span>{" "}
            <span className="font-semibold">{secondCommittee ? committeeNames[secondCommittee] || secondCommittee : "Not selected"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={control}
              name="secondPreferenceCommittee1stCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    1st Allocation Preference *
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
              name="secondPreferenceCommittee2ndCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    2nd Allocation Preference *
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
              name="secondPreferenceCommittee3rdCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    3rd Allocation Preference *
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
        </CardContent>
      </Card>

      {/* 3rd Preference Committee */}
      <Card className="border-primary/20 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base break-words">
            <span className="block sm:inline">3rd Preference Committee:</span>{" "}
            <span className="font-semibold">{thirdCommittee ? committeeNames[thirdCommittee] || thirdCommittee : "Not selected"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={control}
              name="thirdPreferenceCommittee1stCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    1st Allocation Preference *
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
              name="thirdPreferenceCommittee2ndCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    2nd Allocation Preference *
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
              name="thirdPreferenceCommittee3rdCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    3rd Allocation Preference *
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
        </CardContent>
      </Card>
    </div>
  );
}
