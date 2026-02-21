'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { FirstRoundRegistrationSchema } from '@/schemas/firstRoundRegistrationForm';

interface PriorExperienceStepProps {
  control: Control<FirstRoundRegistrationSchema>;
}

const MAX_WORDS = 300;

/**
 * Prior MUN Experience Step
 * Collects details about participant's prior MUN/debate experience
 * Max 300 words
 */
export function PriorExperienceStep({ control }: PriorExperienceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground/90">
          Prior MUN Experience
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Please describe your prior experience with Model United Nations or
          similar public speaking/debate events.
        </p>
      </div>

      <FormField
        control={control}
        name="priorMUNExperience"
        render={({ field }) => {
          const value = field.value ?? '';
          const words = value.trim().split(/\s+/).filter(Boolean);
          const wordCount = value.trim().length === 0 ? 0 : words.length;
          const overLimit = wordCount > MAX_WORDS;

          return (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Prior MUN / Public Speaking Experience *
              </FormLabel>
              <FormControl>
                <div className="space-y-1">
                  <Textarea
                    className={`border-primary/20 focus:border-primary min-h-[150px] ${
                      overLimit
                        ? 'border-destructive focus:border-destructive'
                        : ''
                    }`}
                    placeholder="Describe your prior experiences with MUNs, debates, public speaking events, etc. (up to 300 words)"
                    {...field}
                  />
                  <p
                    className={`text-xs text-right ${
                      overLimit
                        ? 'text-destructive font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {wordCount} / {MAX_WORDS} words
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
