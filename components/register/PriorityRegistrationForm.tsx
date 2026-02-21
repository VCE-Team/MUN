'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowRight, ArrowLeft, Edit2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  PriorityRegistrationSchema,
  priorityRegistrationSchema,
} from '@/schemas/priorityRegistrationForm';
import { PersonalDetailsStep } from './PrioritySteps/PersonalDetailsStep';
import { CommitteePreferencesStep } from './PrioritySteps/CommitteePreferencesStep';
import { CountryPreferencesStep } from './PrioritySteps/CountryPreferencesStep';
import { PriorExperienceStep } from './PrioritySteps/PriorExperienceStep';
import { PaymentStep } from './PrioritySteps/PaymentStep';
import { ReviewStep } from './PrioritySteps/ReviewStep';
import { appConfig } from '@/lib/app-config';

export function PriorityRegistrationForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const router = useRouter();

  const form = useForm<PriorityRegistrationSchema>({
    resolver: zodResolver(priorityRegistrationSchema),
    defaultValues: {
      targetAudience: undefined,
      name: '',
      email: '',
      phone: '',
      institution: '',
      otherInstitution: '',
      rollNumber: '',
      firstPreferenceCommittee: '',
      secondPreferenceCommittee: '',
      thirdPreferenceCommittee: '',
      firstPreferenceCommittee1stCountry: '',
      firstPreferenceCommittee2ndCountry: '',
      firstPreferenceCommittee3rdCountry: '',
      firstPreferenceCommitteeIPRole: undefined,
      secondPreferenceCommittee1stCountry: '',
      secondPreferenceCommittee2ndCountry: '',
      secondPreferenceCommittee3rdCountry: '',
      secondPreferenceCommitteeIPRole: undefined,
      thirdPreferenceCommittee1stCountry: '',
      thirdPreferenceCommittee2ndCountry: '',
      thirdPreferenceCommittee3rdCountry: '',
      thirdPreferenceCommitteeIPRole: undefined,
      priorMUNExperience: '',
      transportationRequired: 'no',
      foodPreference: 'veg',
      transactionId: '',
      paymentScreenshotUrl: '',
    },
  });

  const targetAudience = form.watch('targetAudience');
  const registrationFee = targetAudience === 'inHouse' ? 800 : 1300;

  const checkEmailExists = async (email: string) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await fetch(
        `${appConfig.backendUrl}/api/check-email?email=${encodeURIComponent(
          normalizedEmail
        )}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data.exists || false;
    } catch (error) {
      // On any network/CORS error, just treat as "not existing"
      return false;
    }
  };

  const validateStep = async (stepNumber: number): Promise<boolean> => {
    let fieldsToValidate: (keyof PriorityRegistrationSchema)[] = [];

    switch (stepNumber) {
      // Step 1: Personal details only
      case 1:
        fieldsToValidate = [
          'targetAudience',
          'name',
          'email',
          'phone',
          'institution',
        ];
        if (targetAudience === 'inHouse') {
          fieldsToValidate.push('rollNumber');
        } else {
          // For otherCollege, validate otherInstitution if "Other" is selected
          const currentInstitution = form.getValues('institution');
          if (currentInstitution === 'Other') {
            fieldsToValidate.push('otherInstitution');
          }
        }
        break;
      // Step 2: Committees + allocation preferences + prior experience
      case 2:
        fieldsToValidate = [
          'firstPreferenceCommittee',
          'secondPreferenceCommittee',
          'thirdPreferenceCommittee',
          'firstPreferenceCommittee1stCountry',
          'firstPreferenceCommittee2ndCountry',
          'firstPreferenceCommittee3rdCountry',
          'firstPreferenceCommitteeIPRole',
          'secondPreferenceCommittee1stCountry',
          'secondPreferenceCommittee2ndCountry',
          'secondPreferenceCommittee3rdCountry',
          'secondPreferenceCommitteeIPRole',
          'thirdPreferenceCommittee1stCountry',
          'thirdPreferenceCommittee2ndCountry',
          'thirdPreferenceCommittee3rdCountry',
          'thirdPreferenceCommitteeIPRole',
          'priorMUNExperience',
        ];
        break;
      // Step 3: Payment
      case 3:
        fieldsToValidate = ['transactionId', 'paymentScreenshotUrl'];
        break;
    }

    const result = await form.trigger(fieldsToValidate);

    // Check email uniqueness on step 1
    if (stepNumber === 1 && result) {
      const email = form.getValues('email');
      if (email) {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          toast({
            title: 'Email already registered',
            description: 'This email is already registered for First Round.',
            variant: 'destructive',
          });
          return false;
        }
      }
    }

    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      if (step === 3) {
        setIsReviewMode(true);
        setStep(4);
      } else {
        setStep(step + 1);
      }
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields correctly.',
        variant: 'destructive',
      });
    }
  };

  const prevStep = () => {
    if (step === 4 && isReviewMode) {
      setIsReviewMode(false);
      setStep(3);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const editStep = (stepNumber: number) => {
    setIsReviewMode(false);
    setStep(stepNumber);
  };

  async function onSubmit(values: PriorityRegistrationSchema) {
    setIsLoading(true);
    try {
      // For in-house, institution is automatically set to VCE
      let institutionValue = '';
      if (values.targetAudience === 'inHouse') {
        institutionValue = 'Vardhaman College of Engineering';
      } else if (values.institution === 'Other' && values.otherInstitution) {
        institutionValue = values.otherInstitution;
      } else {
        institutionValue = values.institution;
      }

      const payload = {
        targetAudience: values.targetAudience,
        name: values.name,
        email: values.email,
        phone: values.phone,
        institution: institutionValue,
        otherInstitution:
          values.institution === 'Other' ? values.otherInstitution : undefined,
        rollNumber: values.rollNumber,
        firstPreferenceCommittee: values.firstPreferenceCommittee,
        secondPreferenceCommittee: values.secondPreferenceCommittee,
        thirdPreferenceCommittee: values.thirdPreferenceCommittee,
        firstPreferenceCommittee1stCountry:
          values.firstPreferenceCommittee1stCountry,
        firstPreferenceCommittee2ndCountry:
          values.firstPreferenceCommittee2ndCountry,
        firstPreferenceCommittee3rdCountry:
          values.firstPreferenceCommittee3rdCountry,
        secondPreferenceCommittee1stCountry:
          values.secondPreferenceCommittee1stCountry,
        secondPreferenceCommittee2ndCountry:
          values.secondPreferenceCommittee2ndCountry,
        secondPreferenceCommittee3rdCountry:
          values.secondPreferenceCommittee3rdCountry,
        thirdPreferenceCommittee1stCountry:
          values.thirdPreferenceCommittee1stCountry,
        thirdPreferenceCommittee2ndCountry:
          values.thirdPreferenceCommittee2ndCountry,
        thirdPreferenceCommittee3rdCountry:
          values.thirdPreferenceCommittee3rdCountry,
        firstPreferenceCommitteeIPRole: values.firstPreferenceCommitteeIPRole,
        secondPreferenceCommitteeIPRole: values.secondPreferenceCommitteeIPRole,
        thirdPreferenceCommitteeIPRole: values.thirdPreferenceCommitteeIPRole,
        priorMUNExperience: values.priorMUNExperience,
        transportationRequired: values.transportationRequired,
        foodPreference: values.foodPreference,
        transactionId: values.transactionId,
        paymentScreenshotUrl: values.paymentScreenshotUrl,
      };

      const response = await fetch(
        `${appConfig.backendUrl}/api/priority-register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `Server error: ${response.status}`,
        }));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Registration Successful',
          description:
            'First Round registration completed! You will receive a confirmation email shortly.',
        });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      let errorMessage =
        'There was an error processing your registration. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;
        // Handle network errors
        if (
          error.message.includes('fetch') ||
          error.message.includes('network')
        ) {
          errorMessage =
            'Network error. Please check your connection and try again.';
        }
      }

      toast({
        title: 'Registration Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Committees, Countries & Experience';
      case 3:
        return 'Review & Confirm';
      default:
        return 'Registration';
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center space-y-2 mb-6 px-4">
          {/* <p className="text-xs sm:text-sm text-muted-foreground">
            First Round is now open!
          </p> */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            Step {step} of 4: {getStepTitle()}
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-6 sm:w-8 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <PersonalDetailsStep control={form.control} form={form} />
        )}

        {step === 2 && (
          <>
            <CommitteePreferencesStep control={form.control} form={form} />
            <CountryPreferencesStep control={form.control} form={form} />
            <PriorExperienceStep control={form.control} />
          </>
        )}

        {step === 3 && (
          <PaymentStep
            control={form.control}
            form={form}
            registrationFee={registrationFee}
          />
        )}

        {step === 4 && (
          <ReviewStep
            control={form.control}
            form={form}
            registrationFee={registrationFee}
            onEdit={editStep}
            isSubmitting={isLoading}
          />
        )}

        <div className="mt-8 pt-4 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="w-full sm:w-auto border-primary/20 hover:bg-primary/5"
              disabled={isLoading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          <div className="flex gap-2 w-full sm:w-auto sm:ml-auto sm:justify-end">
            {step < 4 && (
              <Button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
            {step === 4 && (
              <Button
                type="submit"
                className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
                disabled={isLoading}
                aria-busy={isLoading}
                aria-disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4 shrink-0" />
                    <span>Confirm & Submit</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
