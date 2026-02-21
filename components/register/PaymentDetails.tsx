import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormSchema } from '@/schemas/registrationForm';

interface PaymentDetailsProps {
  control: Control<FormSchema>;
  showFirstQR: boolean;
  setShowFirstQR: (show: boolean) => void;
  form: {
    setValue: UseFormSetValue<FormSchema>;
  };
  calculatePrice: () => number;
  registrationType: 'single' | 'multiple';
}

export function PaymentDetails({
  control,
  showFirstQR,
  setShowFirstQR,
  form,
  calculatePrice,
  registrationType,
}: PaymentDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground/90">
          Payment Details
        </h2>
        <p className="text-muted-foreground">
          Please scan the QR code to make the payment
        </p>
        <p className="text-sm text-primary">
          If you face any payment issues, try the other QR code.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 p-6 bg-secondary/10 rounded-lg">
        {!showFirstQR && (
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center border-primary/40 hover:bg-primary/5"
            onClick={() => {
              setShowFirstQR(true);
              form.setValue('qrUsed', 'qr1');
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <div className="relative w-48 h-48">
          <Image
            src={
              showFirstQR
                ? '/images/payment/qr1min.jpg'
                : '/images/payment/qr2min.jpg'
            }
            alt="Payment QR Code"
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>

        {showFirstQR && (
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center border-primary/40 hover:bg-primary/5"
            onClick={() => {
              setShowFirstQR(false);
              form.setValue('qrUsed', 'qr2');
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="text-center sm:text-left">
        <p className="text-lg font-semibold text-foreground/90">
          Amount: ₹{calculatePrice()}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Scan to pay via UPI
        </p>
        {registrationType === 'multiple' && (
          <p className="text-sm text-primary mt-2">
            You&apos;re saving ₹599 with the group registration!
          </p>
        )}
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
                placeholder="Enter the transaction ID"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
