'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, UseFormReturn } from 'react-hook-form';
import { FirstRoundRegistrationSchema } from '@/schemas/firstRoundRegistrationForm';

interface CommitteePreferencesStepProps {
  control: Control<FirstRoundRegistrationSchema>;
  form: UseFormReturn<FirstRoundRegistrationSchema>;
}

/**
 * Committee Preferences Step
 * Allows selection of 1st, 2nd, and 3rd preference committees
 * Available committees: DISEC, UNHRC, AIPPM, International Press (IP)
 */
export function CommitteePreferencesStep({
  control,
  form,
}: CommitteePreferencesStepProps) {
  const firstPreference = form.watch('firstPreferenceCommittee');
  const secondPreference = form.watch('secondPreferenceCommittee');
  const thirdPreference = form.watch('thirdPreferenceCommittee');

  const committees = [
    {
      value: 'disec',
      label: 'Disarmament and International Security Committee (DISEC)',
    },
    { value: 'unhrc', label: 'United Nations Human Rights Council (UNHRC)' },
    { value: 'aippm', label: 'All India Political Parties Meet (AIPPM)' },
    { value: 'ip', label: 'International Press (IP)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground/90">
          Committee Preferences
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Select your first, second and third preference committees. You will be
          allocated based on availability.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FormField
          control={control}
          name="firstPreferenceCommittee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                1st Preference Committee *
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select first preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {committees.map((committee) => {
                    const isDisabled =
                      committee.value === secondPreference ||
                      committee.value === thirdPreference;
                    return (
                      <SelectItem
                        key={committee.value}
                        value={committee.value}
                        disabled={isDisabled}
                      >
                        {committee.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="secondPreferenceCommittee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                2nd Preference Committee *
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select second preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {committees.map((committee) => {
                    const isDisabled =
                      committee.value === firstPreference ||
                      committee.value === thirdPreference;
                    return (
                      <SelectItem
                        key={committee.value}
                        value={committee.value}
                        disabled={isDisabled}
                      >
                        {committee.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="thirdPreferenceCommittee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                3rd Preference Committee *
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select third preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {committees.map((committee) => {
                    const isDisabled =
                      committee.value === firstPreference ||
                      committee.value === secondPreference;
                    return (
                      <SelectItem
                        key={committee.value}
                        value={committee.value}
                        disabled={isDisabled}
                      >
                        {committee.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
