"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { PriorityRegistrationSchema } from "@/schemas/priorityRegistrationForm";

interface PriorExperienceStepProps {
  control: Control<PriorityRegistrationSchema>;
}

export function PriorExperienceStep({ control }: PriorExperienceStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground/90">
        Prior MUN Experience
      </h3>
      <p className="text-sm text-muted-foreground">
        Please describe your prior experience with Model United Nations or
        similar public speaking/debate events.
      </p>

      <FormField
        control={control}
        name="priorMUNExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80">
              Prior MUN / Public Speaking Experience *
            </FormLabel>
            <FormControl>
              <Textarea
                className="border-primary/20 focus:border-primary min-h-[150px]"
                placeholder="Describe your prior experiences with MUNs, debates, public speaking events, etc."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
