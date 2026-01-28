import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormSchema, formSchema } from "@/schemas/registrationForm";
import { ParticipantDetails } from "./ParticipantDetails";
import { PaymentDetails } from "./PaymentDetails";
import { RegistrationType } from "./RegistrationType";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://munvcebackend.onrender.com";

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showFirstQR, setShowFirstQR] = useState(true);
  const [registrationType, setRegistrationType] = useState<
    "single" | "multiple"
  >("single");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationType: "single",
      participants: [
        {
          name: "",
          email: "",
          phone: "",
          institution: "",
          committee: "",
          firstPreferenceCountry: "",
          secondPreferenceCountry: "",
          thirdPreferenceCountry: "",
          priorExperiences: "",
          role: "",
        },
      ],
      transactionId: "",
      qrUsed: "qr1",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const calculatePrice = () => {
    if (registrationType === "single") {
      return 599;
    } else {
      return 599 * 5;
    }
  };

  const checkEmailExists = async (email: string) => {
    const response = await fetch(
      `${BACKEND_URL}/api/check-email?email=${encodeURIComponent(email)}`
    );
    const data = await response.json();
    return data.exists;
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      setIsLoading(true);
      try {
        isValid = await form.trigger("participants");

        if (isValid) {
          const participants = form.getValues("participants");
          if (registrationType === "multiple" && participants.length < 6) {
            toast({
              title: "Incomplete Group Registration",
              description: "Please add details for all 6 participants.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }

          for (const participant of participants) {
            const emailExists = await checkEmailExists(participant.email);
            if (emailExists) {
              toast({
                title: "Email already used for registration",
                description: `Email ${participant.email} is already registered.`,
                variant: "destructive",
              });
              setIsLoading(false);
              return;
            }
          }

          setStep(2);
        } else {
          toast({
            title: "Validation Error",
            description: "Please check all the fields properly.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  async function onSubmit(values: FormSchema) {
    setIsLoading(true);
    try {
      if (values.registrationType === "single") {
        const participant = values.participants[0];
        const payload = {
          ...participant,
          transactionId: values.transactionId,
          qrUsed: values.qrUsed,
        };

        const response = await fetch(`${BACKEND_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          toast({
            title: "Registration Successful",
            description:
              "Registered Successfully! You will receive a mail in a few days.",
          });
          setTimeout(() => {
            router.push("/");
          }, 5000);
        } else {
          throw new Error(data.message);
        }
      } else {
        const response = await fetch(`${BACKEND_URL}/api/register-multiple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            participants: values.participants,
            transactionId: values.transactionId,
            registrationType: values.registrationType,
            qrUsed: values.qrUsed,
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast({
            title: "Group Registration Successful",
            description:
              "All participants registered successfully! You will receive a mail in a few days.",
          });
          setTimeout(() => {
            router.push("/");
          }, 5000);
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const currentType = form.getValues("registrationType");
    if (currentType !== registrationType) {
      setRegistrationType(currentType as "single" | "multiple");

      if (currentType === "single") {
        form.setValue("participants", [
          {
            name: "",
            email: "",
            phone: "",
            institution: "",
            committee: "",
            firstPreferenceCountry: "",
            secondPreferenceCountry: "",
            thirdPreferenceCountry: "",
            priorExperiences: "",
            role: "",
          },
        ]);
      } else {
        const currentParticipants = form.getValues("participants");
        const newParticipants = [...currentParticipants];

        while (newParticipants.length < 6) {
          newParticipants.push({
            name: "",
            email: "",
            phone: "",
            institution: "",
            committee: "",
            firstPreferenceCountry: "",
            secondPreferenceCountry: "",
            thirdPreferenceCountry: "",
            priorExperiences: "",
            role: "",
          });
        }

        if (newParticipants.length > 6) {
          newParticipants.length = 6;
        }

        form.setValue("participants", newParticipants);
      }
    }
  }, [form.watch("registrationType")]);

  useEffect(() => {
    fields.forEach((field, index) => {
      const committee = form.getValues(`participants.${index}.committee`);
      if (committee === "ip") {
        form.setValue(`participants.${index}.priorExperiences`, "");
      } else if (["disec", "unhrc", "ecosoc"].includes(committee)) {
        form.setValue(`participants.${index}.role`, "");
      }
    });
  }, [fields, form.watch("participants")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RegistrationType control={form.control} disabled={step === 2} />

        {step === 1 && (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <ParticipantDetails
                key={field.id}
                field={field}
                index={index}
                control={form.control}
                form={form}
                registrationType={registrationType}
                onRemove={() => remove(index)}
                fields={fields}
              />
            ))}

            {registrationType === "multiple" && fields.length < 6 && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    name: "",
                    email: "",
                    phone: "",
                    institution: "",
                    committee: "",
                    firstPreferenceCountry: "",
                    secondPreferenceCountry: "",
                    thirdPreferenceCountry: "",
                    priorExperiences: "",
                    role: "",
                  })
                }
                className="w-full border-dashed border-primary/40 hover:bg-primary/5"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Participant ({fields.length}/6)
              </Button>
            )}

            <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {registrationType === "single"
                  ? "Registration fee: ₹599 per person"
                  : "Registration package: Register 5 participants at ₹599 each and get 1 registration free. Total: ₹2,995"}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <PaymentDetails
            control={form.control}
            showFirstQR={showFirstQR}
            setShowFirstQR={setShowFirstQR}
            form={{ setValue: form.setValue }}
            calculatePrice={calculatePrice}
            registrationType={registrationType}
          />
        )}

        <div className="mt-8 pt-4 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="w-full sm:w-auto border-primary/20 hover:bg-primary/5"
            >
              Previous
            </Button>
          )}
          {step === 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="w-full sm:w-auto sm:ml-auto bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Continue to Payment"
              )}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full sm:w-auto sm:ml-auto bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
