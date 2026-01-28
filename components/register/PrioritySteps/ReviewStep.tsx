"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Control, UseFormReturn } from "react-hook-form";
import { PriorityRegistrationSchema } from "@/schemas/priorityRegistrationForm";
import { Edit2 } from "lucide-react";

interface ReviewStepProps {
  control: Control<PriorityRegistrationSchema>;
  form: UseFormReturn<PriorityRegistrationSchema>;
  registrationFee: number;
  onEdit: (step: number) => void;
}

const committeeNames: Record<string, string> = {
  disec: "Disarmament and International Security Committee (DISEC)",
  unhrc: "United Nations Human Rights Council (UNHRC)",
  aippm: "All India Political Parties Meet (AIPPM)",
  ip: "International Press (IP)",
};

export function ReviewStep({
  control,
  form,
  registrationFee,
  onEdit,
}: ReviewStepProps) {
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground/90">
          Review Your Registration
        </h3>
        <p className="text-sm text-muted-foreground">
          Please review all details. You can edit any section before submitting.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Personal Details</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(1)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Registration Type</p>
              <p className="font-medium">
                {values.targetAudience === "inHouse"
                  ? "In House (VCE Student)"
                  : "Other Colleges"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">{values.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{values.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{values.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Institution</p>
              <p className="font-medium">
                {values.targetAudience === "inHouse"
                  ? "Vardhaman College of Engineering"
                  : values.otherInstitution || values.institution}
              </p>
            </div>
            {values.rollNumber && (
              <div>
                <p className="text-muted-foreground">Roll Number</p>
                <p className="font-medium">{values.rollNumber}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Committee Preferences</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">1st Preference</p>
            <p className="font-medium">
              {committeeNames[values.firstPreferenceCommittee] ||
                values.firstPreferenceCommittee}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">2nd Preference</p>
            <p className="font-medium">
              {committeeNames[values.secondPreferenceCommittee] ||
                values.secondPreferenceCommittee}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Country Preferences</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(3)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-muted-foreground">1st Preference</p>
              <p className="font-medium">{values.firstPreferenceCountry}</p>
            </div>
            <div>
              <p className="text-muted-foreground">2nd Preference</p>
              <p className="font-medium">{values.secondPreferenceCountry}</p>
            </div>
            <div>
              <p className="text-muted-foreground">3rd Preference</p>
              <p className="font-medium">{values.thirdPreferenceCountry}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Prior MUN Experience</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(4)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="text-muted-foreground mb-2">Experience</p>
          <p className="font-medium whitespace-pre-wrap">
            {values.priorMUNExperience}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Payment Details</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(5)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">Registration Fee</p>
            <p className="font-medium text-lg">₹{registrationFee}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Transaction ID</p>
            <p className="font-medium">{values.transactionId}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment Screenshot</p>
            <p className="font-medium">
              {values.paymentScreenshotUrl ? (
                <span className="text-green-600">Uploaded ✓</span>
              ) : (
                <span className="text-destructive">Not uploaded</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
