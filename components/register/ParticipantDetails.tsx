import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { Control, UseFormReturn } from "react-hook-form";
import { CountryPreferences } from "./CountryPreferences";
import { FormSchema } from "@/schemas/registrationForm";

interface ParticipantDetailsProps {
  field: Record<string, string>;
  index: number;
  control: Control<FormSchema>;
  form: UseFormReturn<FormSchema>;
  registrationType: "single" | "multiple";
  onRemove: () => void;
  fields: Array<Record<string, string>>;
}

export function ParticipantDetails({
  index,
  control,
  form,
  registrationType,
  onRemove,
  fields,
}: ParticipantDetailsProps) {
  return (
    <div className="space-y-6 p-4 border border-primary/10 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground/90">
          {registrationType === "single"
            ? "Participant Details"
            : `Participant ${index + 1} ${index === 5 ? "(Free)" : ""}`}
        </h3>
        {registrationType === "multiple" && fields.length > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive/80"
            disabled={fields.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Basic Details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name={`participants.${index}.name`}
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
          name={`participants.${index}.email`}
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

      {/* Contact and Institution */}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name={`participants.${index}.phone`}
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
          name={`participants.${index}.institution`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Institution *
              </FormLabel>
              <Select
                onValueChange={value => {
                  field.onChange(value);
                  if (value === "Other") {
                    form.setValue(`participants.${index}.otherInstitution`, "");
                  } else {
                    form.setValue(
                      `participants.${index}.otherInstitution`,
                      undefined
                    );
                  }
                  if (value === "Vardhaman College of Engineering") {
                    form.setValue(`participants.${index}.rollNumber`, "");
                  } else {
                    form.setValue(
                      `participants.${index}.rollNumber`,
                      undefined
                    );
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select your institution" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Vardhaman College of Engineering">
                    Vardhaman College of Engineering
                  </SelectItem>
                  <SelectItem value="Vasavi College of Engineering">
                    Vasavi College of Engineering
                  </SelectItem>
                  <SelectItem value="CVR College of Engineering">
                    CVR College of Engineering
                  </SelectItem>
                  <SelectItem value="G Narayanamma Institute of Technology and Science">
                    G Narayanamma Institute of Technology and Science
                  </SelectItem>
                  <SelectItem value="Sreenidhi Institute of Science and Technology">
                    Sreenidhi Institute of Science and Technology
                  </SelectItem>
                  <SelectItem value="Jawaharlal Nehru Technological University Hyderabad">
                    Jawaharlal Nehru Technological University Hyderabad
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Additional Institution Fields */}
      {form.getValues(`participants.${index}.institution`) === "Other" && (
        <FormField
          control={control}
          name={`participants.${index}.otherInstitution`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                Other Institution *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="Enter your institution"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.getValues(`participants.${index}.institution`) ===
        "Vardhaman College of Engineering" && (
        <FormField
          control={control}
          name={`participants.${index}.rollNumber`}
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

      {/* Committee Selection */}
      <FormField
        control={control}
        name={`participants.${index}.committee`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80">
              Select Committee *
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select a committee" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="disec">
                  Disarmament and International Security Committee (DISEC)
                </SelectItem>
                <SelectItem value="unhrc">
                  United Nations Human Rights Council (UNHRC)
                </SelectItem>
                <SelectItem value="aippm">
                  All India Political Parties Meet (AIPPM)
                </SelectItem>
                <SelectItem value="ip">International Press (IP)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* {form.getValues(`participants.${index}.committee`) === "disec" && (
        <p className="mt-2 text-sm text-destructive">
          Registrations for DISEC are closed. Please select another committee.
        </p>
      )} */}
      {/* {form.getValues(`participants.${index}.committee`) === "unhrc" && (
        <p className="mt-2 text-sm text-destructive">
          Registrations for UNHRC are closed. Please select another committee.
        </p>
      )} */}

      {/* Committee-specific Fields */}
      {["disec", "unhrc", "aippm"].includes(
        form.getValues(`participants.${index}.committee`)
      ) && (
        <FormField
          control={control}
          name={`participants.${index}.priorExperiences`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">
                What are your prior experiences with MUNs/public speaking
                events? *
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primary/20 focus:border-primary"
                  placeholder="Describe your experiences"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.getValues(`participants.${index}.committee`) === "ip" && (
        <FormField
          control={control}
          name={`participants.${index}.role`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Role *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="photographer">Photographer</SelectItem>
                  <SelectItem value="journalist">Journalist</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <Separator className="my-6" />

      <CountryPreferences control={control} index={index} />
    </div>
  );
}
