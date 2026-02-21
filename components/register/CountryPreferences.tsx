import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormSchema } from '@/schemas/registrationForm';

interface CountryPreferencesProps {
  control: Control<FormSchema>;
  index: number;
}

export function CountryPreferences({
  control,
  index,
}: CountryPreferencesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground/90">
        Country Preferences
      </h3>
      <div className="grid gap-6 sm:grid-cols-3">
        <FormField
          control={control}
          name={`participants.${index}.firstPreferenceCountry`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                1st Preference *
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
          name={`participants.${index}.secondPreferenceCountry`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                2nd Preference *
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
          name={`participants.${index}.thirdPreferenceCountry`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                3rd Preference *
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
