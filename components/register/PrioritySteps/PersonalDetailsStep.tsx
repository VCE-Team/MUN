"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control, UseFormReturn } from "react-hook-form";
import { PriorityRegistrationSchema } from "@/schemas/priorityRegistrationForm";
import { useState, useEffect } from "react";
import { appConfig } from "@/lib/app-config";

interface PersonalDetailsStepProps {
  control: Control<PriorityRegistrationSchema>;
  form: UseFormReturn<PriorityRegistrationSchema>;
}

// Utility function to capitalize institution names properly
function capitalizeInstitutionName(name: string): string {
  const words = name.trim().split(/\s+/);
  return words
    .map((word, index) => {
      const lowerWord = word.toLowerCase();
      // Don't capitalize "of" unless it's the first word
      if (lowerWord === "of" && index > 0) {
        return lowerWord;
      }
      // Capitalize first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

const defaultInstitutions = [
  "Vasavi College of Engineering",
  "CVR College of Engineering",
  "G Narayanamma Institute of Technology and Science",
  "Sreenidhi Institute of Science and Technology",
  "Jawaharlal Nehru Technological University Hyderabad",
];

export function PersonalDetailsStep({
  control,
  form,
}: PersonalDetailsStepProps) {
  const targetAudience = form.watch("targetAudience");
  const institution = form.watch("institution");
  const [customInstitutions, setCustomInstitutions] = useState<string[]>([]);
  const [fetchedInstitutions, setFetchedInstitutions] = useState<string[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInstitutionValue, setCustomInstitutionValue] = useState("");

  useEffect(() => {
    fetch(`${appConfig.backendUrl}/api/institutions`)
      .then((r) => (r.ok ? r.json() : []))
      .then((arr) => setFetchedInstitutions(Array.isArray(arr) ? arr : []))
      .catch(() => setFetchedInstitutions([]));
  }, []);

  // Auto-set institution for in-house users
  useEffect(() => {
    if (targetAudience === "inHouse") {
      form.setValue("institution", "Vardhaman College of Engineering");
      setShowCustomInput(false);
    } else if (targetAudience === "otherCollege" && institution === "Vardhaman College of Engineering") {
      form.setValue("institution", "");
    }
  }, [targetAudience, form]);

  // Handle institution selection
  useEffect(() => {
    if (institution === "Other") {
      setShowCustomInput(true);
    } else if (institution && institution !== "Vardhaman College of Engineering") {
      setShowCustomInput(false);
    }
  }, [institution]);

  const handleCustomInstitutionSubmit = () => {
    if (customInstitutionValue.trim()) {
      const capitalized = capitalizeInstitutionName(customInstitutionValue);
      
      // Add to custom institutions list if not already present
      if (!customInstitutions.includes(capitalized) && 
          !defaultInstitutions.includes(capitalized) &&
          capitalized !== "Vardhaman College of Engineering") {
        setCustomInstitutions((prev) => [...prev, capitalized]);
      }
      
      // Set the institution value
      form.setValue("institution", capitalized);
      form.setValue("otherInstitution", capitalized);
      setShowCustomInput(false);
      setCustomInstitutionValue("");
      form.clearErrors("otherInstitution");
    }
  };

  // Default + from registered users (API) + custom, exclude Vardhaman, dedupe
  const allInstitutions = [
    ...defaultInstitutions,
    ...fetchedInstitutions,
    ...customInstitutions,
  ]
    .filter((name) => name !== "Vardhaman College of Engineering")
    .filter((name, i, arr) => arr.indexOf(name) === i);

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
                  value={field.value ?? ""}
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
              {targetAudience === "inHouse" ? (
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
                      if (value === "Other") {
                        setShowCustomInput(true);
                        field.onChange("Other");
                        form.setValue("otherInstitution", "");
                      } else {
                        field.onChange(value);
                        form.setValue("otherInstitution", "");
                        setShowCustomInput(false);
                      }
                    }}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select your institution" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allInstitutions.map((inst) => (
                        <SelectItem key={inst} value={inst}>
                          {inst}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other (Type to add)</SelectItem>
                    </SelectContent>
                  </Select>
                  {showCustomInput && (
                    <div className="mt-2 space-y-2">
                      <FormField
                        control={control}
                        name="otherInstitution"
                        render={({ field: otherField }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Type your institution name"
                                value={customInstitutionValue}
                                onChange={(e) => {
                                  setCustomInstitutionValue(e.target.value);
                                  otherField.onChange(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleCustomInstitutionSubmit();
                                  }
                                }}
                                className="border-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCustomInstitutionSubmit}
                          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                          Add Institution
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCustomInput(false);
                            setCustomInstitutionValue("");
                            field.onChange("");
                            form.setValue("otherInstitution", "");
                          }}
                          className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {targetAudience === "inHouse" && (
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
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
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
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
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
