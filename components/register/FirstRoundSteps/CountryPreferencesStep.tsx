'use client';

import { useEffect } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, UseFormReturn } from 'react-hook-form';
import { FirstRoundRegistrationSchema } from '@/schemas/firstRoundRegistrationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryPreferencesStepProps {
  control: Control<FirstRoundRegistrationSchema>;
  form: UseFormReturn<FirstRoundRegistrationSchema>;
}

/**
 * Country/Allocation Preferences Step
 * - For regular committees (DISEC, UNHRC, AIPPM): collect 3 country preferences
 * - For International Press (IP): collect role preference (Photographer/Journalist)
 */

const committeeNames: Record<string, string> = {
  disec: 'DISEC',
  unhrc: 'UNHRC',
  aippm: 'AIPPM',
  ip: 'International Press (IP)',
};

const IP_ROLES = [
  { value: 'photographer', label: 'Photographer' },
  { value: 'journalist', label: 'Journalist' },
] as const;

export function CountryPreferencesStep({
  control,
  form,
}: CountryPreferencesStepProps) {
  const firstCommittee = form.watch('firstPreferenceCommittee');
  const secondCommittee = form.watch('secondPreferenceCommittee');
  const thirdCommittee = form.watch('thirdPreferenceCommittee');

  // When committee changes to/from IP, clear the other allocation type
  useEffect(() => {
    if (firstCommittee === 'ip') {
      form.setValue('firstPreferenceCommittee1stCountry', '');
      form.setValue('firstPreferenceCommittee2ndCountry', '');
      form.setValue('firstPreferenceCommittee3rdCountry', '');
    } else {
      form.setValue('firstPreferenceCommitteeIPRole', undefined);
    }
  }, [firstCommittee, form]);

  useEffect(() => {
    if (secondCommittee === 'ip') {
      form.setValue('secondPreferenceCommittee1stCountry', '');
      form.setValue('secondPreferenceCommittee2ndCountry', '');
      form.setValue('secondPreferenceCommittee3rdCountry', '');
    } else {
      form.setValue('secondPreferenceCommitteeIPRole', undefined);
    }
  }, [secondCommittee, form]);

  useEffect(() => {
    if (thirdCommittee === 'ip') {
      form.setValue('thirdPreferenceCommittee1stCountry', '');
      form.setValue('thirdPreferenceCommittee2ndCountry', '');
      form.setValue('thirdPreferenceCommittee3rdCountry', '');
    } else {
      form.setValue('thirdPreferenceCommitteeIPRole', undefined);
    }
  }, [thirdCommittee, form]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground/90 mb-2">
          Allocation Preferences
        </h3>
        <p className="text-sm text-muted-foreground">
          Select your allocation preferences for each committee in order of
          priority.
        </p>
      </div>

      {/* 1st Preference Committee */}
      <Card className="border-primary/20 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base break-words">
            <span className="block sm:inline">1st Preference Committee:</span>{' '}
            <span className="font-semibold">
              {firstCommittee
                ? committeeNames[firstCommittee] || firstCommittee
                : 'Not selected'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {firstCommittee === 'ip' ? (
            <FormField
              control={control}
              name="firstPreferenceCommitteeIPRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    Allocation Preference *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IP_ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          )}
        </CardContent>
      </Card>

      {/* 2nd Preference Committee */}
      <Card className="border-primary/20 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base break-words">
            <span className="block sm:inline">2nd Preference Committee:</span>{' '}
            <span className="font-semibold">
              {secondCommittee
                ? committeeNames[secondCommittee] || secondCommittee
                : 'Not selected'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {secondCommittee === 'ip' ? (
            <FormField
              control={control}
              name="secondPreferenceCommitteeIPRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    Allocation Preference *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IP_ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          )}
        </CardContent>
      </Card>

      {/* 3rd Preference Committee */}
      <Card className="border-primary/20 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base break-words">
            <span className="block sm:inline">3rd Preference Committee:</span>{' '}
            <span className="font-semibold">
              {thirdCommittee
                ? committeeNames[thirdCommittee] || thirdCommittee
                : 'Not selected'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {thirdCommittee === 'ip' ? (
            <FormField
              control={control}
              name="thirdPreferenceCommitteeIPRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">
                    Allocation Preference *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IP_ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
