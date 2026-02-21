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
  isSubmitting?: boolean;
}

const committeeNames: Record<string, string> = {
  disec: "Disarmament and International Security Committee (DISEC)",
  unhrc: "United Nations Human Rights Council (UNHRC)",
  aippm: "All India Political Parties Meet (AIPPM)",
  ip: "International Press (IP)",
};

const ipRoleLabels: Record<string, string> = {
  photographer: "Photographer",
  journalist: "Journalist",
};

export function ReviewStep({
  control,
  form,
  registrationFee,
  onEdit,
  isSubmitting = false,
}: ReviewStepProps) {
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 px-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground/90">
          Review Your Registration
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
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
            disabled={isSubmitting}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <CardTitle className="text-base">
            Committee & Allocation Preferences
          </CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {/* 1st Preference Committee */}
          <div className="space-y-2 pb-3 border-b border-border/50">
            <p className="font-semibold text-foreground/90 text-sm sm:text-base break-words">
              <span className="block sm:inline">1st Preference Committee:</span>{" "}
              <span>
                {committeeNames[values.firstPreferenceCommittee] ||
                  values.firstPreferenceCommittee}
              </span>
            </p>
            {values.firstPreferenceCommittee === "ip" ? (
              <div className="sm:ml-4">
                <p className="text-muted-foreground text-xs">
                  Allocation Preference
                </p>
                <p className="font-medium">
                  {values.firstPreferenceCommitteeIPRole
                    ? ipRoleLabels[values.firstPreferenceCommitteeIPRole]
                    : "—"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:ml-4">
                <div>
                  <p className="text-muted-foreground text-xs">
                    1st Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.firstPreferenceCommittee1stCountry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    2nd Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.firstPreferenceCommittee2ndCountry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    3rd Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.firstPreferenceCommittee3rdCountry}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2nd Preference Committee */}
          <div className="space-y-2 pb-3 border-b border-border/50">
            <p className="font-semibold text-foreground/90 text-sm sm:text-base break-words">
              <span className="block sm:inline">2nd Preference Committee:</span>{" "}
              <span>
                {committeeNames[values.secondPreferenceCommittee] ||
                  values.secondPreferenceCommittee}
              </span>
            </p>
            {values.secondPreferenceCommittee === "ip" ? (
              <div className="sm:ml-4">
                <p className="text-muted-foreground text-xs">
                  Allocation Preference
                </p>
                <p className="font-medium">
                  {values.secondPreferenceCommitteeIPRole
                    ? ipRoleLabels[values.secondPreferenceCommitteeIPRole]
                    : "—"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:ml-4">
                <div>
                  <p className="text-muted-foreground text-xs">
                    1st Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.secondPreferenceCommittee1stCountry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    2nd Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.secondPreferenceCommittee2ndCountry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    3rd Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.secondPreferenceCommittee3rdCountry}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3rd Preference Committee */}
          <div className="space-y-2">
            <p className="font-semibold text-foreground/90 text-sm sm:text-base break-words">
              <span className="block sm:inline">3rd Preference Committee:</span>{" "}
              <span>
                {committeeNames[values.thirdPreferenceCommittee] ||
                  values.thirdPreferenceCommittee}
              </span>
            </p>
            {values.thirdPreferenceCommittee === "ip" ? (
              <div className="sm:ml-4">
                <p className="text-muted-foreground text-xs">
                  Allocation Preference
                </p>
                <p className="font-medium">
                  {values.thirdPreferenceCommitteeIPRole
                    ? ipRoleLabels[values.thirdPreferenceCommitteeIPRole]
                    : "—"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:ml-4">
                <div>
                  <p className="text-muted-foreground text-xs">
                    1st Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.thirdPreferenceCommittee1stCountry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    2nd Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.thirdPreferenceCommittee2ndCountry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    3rd Allocation Preference
                  </p>
                  <p className="font-medium break-words">
                    {values.thirdPreferenceCommittee3rdCountry}
                  </p>
                </div>
              </div>
            )}
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
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
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
            onClick={() => onEdit(3)}
            disabled={isSubmitting}
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
