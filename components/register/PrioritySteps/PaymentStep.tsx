'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Control, UseFormReturn } from 'react-hook-form';
import { PriorityRegistrationSchema } from '@/schemas/priorityRegistrationForm';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  // Compress image to reduce storage size (target: max 500KB base64)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions (max 1920px width, maintain aspect ratio)
          const maxWidth = 1920;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Draw image with compression
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG with quality 0.75 (good balance between quality and size)
          // This typically reduces file size by 60-80% while maintaining readability
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);

          // Check if compressed size is reasonable (base64 is ~33% larger than binary)
          // Target: ~500KB base64 = ~375KB binary
          if (compressedDataUrl.length > 500 * 1024) {
            // Try lower quality (0.6) if still too large
            const smallerDataUrl = canvas.toDataURL('image/jpeg', 0.6);
            resolve(smallerDataUrl);
          } else {
            resolve(compressedDataUrl);
          }
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (file: File | undefined) => {
    if (!file) {
      // Clear URL and preview
      form.setValue('paymentScreenshotUrl', '');
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    // Validate file size (max 10MB original)
    if (file.size > 10 * 1024 * 1024) {
      form.setError('paymentScreenshotUrl', {
        type: 'manual',
        message: 'File size must be less than 10MB',
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      form.setError('paymentScreenshotUrl', {
        type: 'manual',
        message: 'Only image files are allowed (JPEG, JPG, PNG, WebP)',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Compress image before converting to base64
      const compressedDataUrl = await compressImage(file);

      // Save compressed base64 data URL in form state
      form.setValue('paymentScreenshotUrl', compressedDataUrl, {
        shouldValidate: true,
      });
      setPreviewUrl(compressedDataUrl);
      form.clearErrors('paymentScreenshotUrl');
    } catch (error) {
      form.setError('paymentScreenshotUrl', {
        type: 'manual',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to process image. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // When revisiting this step, restore preview from existing URL in form
  useEffect(() => {
    const existingUrl = form.getValues('paymentScreenshotUrl');
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
          Registration Fee:{' '}
          <span className="font-bold">₹{registrationFee}</span>
        </p>
      </div>

      <div className="flex items-center justify-center p-4 sm:p-6 bg-secondary/10 rounded-lg">
        <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56">
          <Image
            src="/images/payment/backupQR.jpeg"
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
                    handleFileChange(file);
                  } else {
                    handleFileChange(undefined);
                  }
                }}
                value={undefined} // Controlled input for file type
                disabled={isUploading}
              />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Upload a screenshot of your payment confirmation (Max 5MB,
              JPG/PNG/WebP). The image will be securely stored via UploadThing.
            </p>
            {previewUrl && (
              <div className="mt-4 relative w-full max-w-md h-48 xs:h-56 sm:h-64 border rounded-lg overflow-hidden bg-gray-900/50">
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
