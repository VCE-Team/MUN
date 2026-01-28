"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Control, UseFormReturn } from "react-hook-form";
import { PriorityRegistrationSchema } from "@/schemas/priorityRegistrationForm";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";

interface PaymentStepProps {
  control: Control<PriorityRegistrationSchema>;
  form: UseFormReturn<PriorityRegistrationSchema>;
  registrationFee: number;
}

export function PaymentStep({
  control,
  form,
  registrationFee,
}: PaymentStepProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("paymentScreenshot");

  const handleFileChange = async (file: File | undefined) => {
    if (file) {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        form.setError("paymentScreenshotUrl", {
          type: "manual",
          message: "File size must be less than 5MB",
        });
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        form.setError("paymentScreenshotUrl", {
          type: "manual",
          message: "Only image files are allowed (JPEG, JPG, PNG, WebP)",
        });
        return;
      }

      setIsUploading(true);
      try {
        const res = await startUpload([file]);
        const uploaded = res?.[0];
        if (!uploaded?.url) {
          form.setError("paymentScreenshotUrl", {
            type: "manual",
            message: "Failed to upload screenshot. Please try again.",
          });
          return;
        }

        // Save URL in form state
        form.setValue("paymentScreenshotUrl", uploaded.url, {
          shouldValidate: true,
        });

        setPreviewUrl(uploaded.url);
        form.clearErrors("paymentScreenshotUrl");
      } catch (err) {
        form.setError("paymentScreenshotUrl", {
          type: "manual",
          message: "Failed to upload screenshot. Please try again.",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // When revisiting this step, restore preview from existing URL in form
  useEffect(() => {
    const existingUrl = form.getValues("paymentScreenshotUrl");
    if (existingUrl && !previewUrl) {
      setPreviewUrl(existingUrl);
    }
  }, [form, previewUrl]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground/90">
          Payment Details
        </h3>
        <p className="text-muted-foreground">
          Please scan the QR code to make the payment
        </p>
        <p className="text-sm text-primary">
          Registration Fee: <span className="font-bold">₹{registrationFee}</span>
        </p>
      </div>

      <div className="flex items-center justify-center p-6 bg-secondary/10 rounded-lg">
        <div className="relative w-56 h-56">
          <Image
            src="/images/payment/VCEMUN2026QR.jpeg"
            alt="Payment QR Code"
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>
      </div>

      <FormField
        control={control}
        name="transactionId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80">
              Transaction ID *
            </FormLabel>
            <FormControl>
              <Input
                className="border-primary/20 focus:border-primary"
                placeholder="Enter the transaction ID from your payment"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="paymentScreenshotUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80">
              Payment Screenshot *
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="border-primary/20 focus:border-primary cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    void handleFileChange(file);
                  } else {
                    // Clear URL and preview
                    form.setValue("paymentScreenshotUrl", "");
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }
                  }
                }}
                value={undefined} // Controlled input for file type
                disabled={isUploading}
              />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Upload a screenshot of your payment confirmation (Max 5MB, JPG/PNG/WebP).
              The image will be securely stored via UploadThing.
            </p>
            {previewUrl && (
              <div className="mt-4 relative w-full max-w-md h-64 border rounded-lg overflow-hidden bg-gray-900/50">
                <Image
                  src={previewUrl}
                  alt="Payment screenshot preview"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
