'use client';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Control, UseFormReturn } from 'react-hook-form';
import { PriorityRegistrationSchema } from '@/schemas/priorityRegistrationForm';
import { useState, useEffect } from 'react';
import { INSTITUTION_OPTIONS } from '@/lib/institutions';

interface PersonalDetailsStepProps {
  control: Control<PriorityRegistrationSchema>;
  form: UseFormReturn<PriorityRegistrationSchema>;
}

export function PersonalDetailsStep({
  control,
  form,
}: PersonalDetailsStepProps) {
  const targetAudience = form.watch('targetAudience');
  const institution = form.watch('institution');
  const otherInstitution = form.watch('otherInstitution');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Auto-set institution for in-house users
  useEffect(() => {
    if (targetAudience === 'inHouse') {
      form.setValue('institution', 'Vardhaman College of Engineering');
      form.setValue('otherInstitution', '');
      setShowCustomInput(false);
    } else if (
      targetAudience === 'otherCollege' &&
      institution === 'Vardhaman College of Engineering'
    ) {
      form.setValue('institution', '');
      form.setValue('otherInstitution', '');
      setShowCustomInput(false);
    }
  }, [targetAudience, form, institution]);

  // Handle institution selection - sync showCustomInput with institution value
  useEffect(() => {
    if (institution === 'Other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      // Clear otherInstitution when a predefined institution is selected
      if (
        institution &&
        institution !== 'Other' &&
        institution !== 'Vardhaman College of Engineering'
      ) {
        form.setValue('otherInstitution', '');
      }
    }
  }, [institution, form]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground/90">
          Registration Type
        </h3>
        <FormField
          control={control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inHouse" id="inHouse" />
                    <Label
                      htmlFor="inHouse"
                      className="font-normal cursor-pointer"
                    >
                      In House (VCE Student) - ₹800
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otherCollege" id="otherCollege" />
                    <Label
                      htmlFor="otherCollege"
                      className="font-normal cursor-pointer"
                    >
                      Other Colleges - ₹1100
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Full Name *</FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Email *</FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="john@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Phone Number *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="+91 XXXXXXXXXX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Institution *
              </FormLabel>
              {targetAudience === 'inHouse' ? (
                <FormControl>
                  <Input
                    className="border-primary/20 focus:border-primary bg-muted"
                    value="Vardhaman College of Engineering"
                    disabled
                    readOnly
                  />
                </FormControl>
              ) : (
                <>
                  <Select
                    onValueChange={(value) => {
                      if (value === 'Other') {
                        field.onChange('Other');
                        form.setValue('otherInstitution', '');
                      } else {
                        field.onChange(value);
                        form.setValue('otherInstitution', '');
                      }
                    }}
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select your institution" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INSTITUTION_OPTIONS.map((inst) => (
                        <SelectItem key={inst} value={inst}>
                          {inst}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other (Type to add)</SelectItem>
                    </SelectContent>
                  </Select>
                  {showCustomInput && (
                    <FormField
                      control={control}
                      name="otherInstitution"
                      render={({ field: otherField }) => (
                        <FormItem className="mt-2">
                          <FormLabel className="text-foreground/80">
                            Type your institution name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your institution name"
                              {...otherField}
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {targetAudience === 'inHouse' && (
        <FormField
          control={control}
          name="rollNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Roll Number *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="Enter your roll number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name="transportationRequired"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Transportation Required? *
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="foodPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Food Preference *
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select food preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
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
