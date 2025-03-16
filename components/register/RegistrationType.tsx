import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { FormSchema } from "@/schemas/registrationForm";

interface RegistrationTypeProps {
  control: Control<FormSchema>;
  disabled: boolean;
}

export function RegistrationType({ control, disabled }: RegistrationTypeProps) {
  return (
    <FormField
      control={control}
      name="registrationType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-foreground/80">
            Registration Type
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
              disabled={disabled}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <label
                  htmlFor="single"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Single Registration (₹599 per person)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <label
                  htmlFor="multiple"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Multiple Registrations (Register 5, Get 1 Free - Total ₹2,995)
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
