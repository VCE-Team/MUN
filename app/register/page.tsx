"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Loader2, Plus, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";

const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .refine(
      value => /^\+?\d{10,}$/.test(value),
      "Please enter a valid phone number"
    ),
  institution: z.string().min(1, { message: "Institution is required" }),
  committee: z.string().min(1, { message: "Please select a committee" }),
  firstPreferenceCountry: z
    .string()
    .min(1, { message: "First preference country is required" }),
  secondPreferenceCountry: z
    .string()
    .min(1, { message: "Second preference country is required" }),
  thirdPreferenceCountry: z
    .string()
    .min(1, { message: "Third preference country is required" }),
  priorExperiences: z.string().optional(),
  role: z.string().optional(),
});

const formSchema = z.object({
  registrationType: z.enum(["single", "multiple"]),
  participants: z.array(participantSchema),
  transactionId: z.string().min(1, { message: "Transaction ID is required" }),
  qrUsed: z.enum(["qr1", "qr2"]),
});

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showFirstQR, setShowFirstQR] = useState(true);
  const [registrationType, setRegistrationType] = useState<
    "single" | "multiple"
  >("single");

  const form = useForm<z.infer<typeof formSchema>>({
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
      `https://munvcebackend.onrender.com/api/check-email?email=${encodeURIComponent(
        email
      )}`
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (values.registrationType === "single") {
        const participant = values.participants[0];
        const payload = {
          ...participant,
          transactionId: values.transactionId,
          qrUsed: values.qrUsed,
        };

        const response = await fetch(
          "https://munvcebackend.onrender.com/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

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
        const response = await fetch(
          "https://munvcebackend.onrender.com/api/register-multiple",
          {
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
          }
        );

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
    <div className="min-h-screen mt-[4rem] bg-gradient-to-b from-background to-secondary/10 px-4 py-8">
      <div className="container max-w-3xl mx-auto">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Register for VCEMUN
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Join us in this diplomatic journey
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              <div
                className={`h-2 w-16 rounded-full ${
                  step === 1 ? "bg-primary" : "bg-primary/30"
                }`}
              />
              <div
                className={`h-2 w-16 rounded-full ${
                  step === 2 ? "bg-primary" : "bg-primary/30"
                }`}
              />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="registrationType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground/80">
                        Registration Type
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                          disabled={step === 2}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <label
                              htmlFor="single"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Single Registration (₹599 per person)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple" id="multiple" />
                            <label
                              htmlFor="multiple"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Multiple Registrations (Register 5, Get 1 Free -
                              Total ₹2,995)
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {step === 1 && (
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-6 p-4 border border-primary/10 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-foreground/90">
                            {registrationType === "single"
                              ? "Participant Details"
                              : `Participant ${index + 1} ${
                                  index === 5 ? "(Free)" : ""
                                }`}
                          </h3>
                          {registrationType === "multiple" &&
                            fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                className="text-destructive hover:text-destructive/80"
                                disabled={fields.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`participants.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Full Name *
                                </FormLabel>
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
                            control={form.control}
                            name={`participants.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Email *
                                </FormLabel>
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
                            control={form.control}
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
                            control={form.control}
                            name={`participants.${index}.institution`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Institution *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-primary/20 focus:border-primary"
                                    placeholder="Your School/College"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`participants.${index}.committee`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Select Committee *
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-primary/20 focus:border-primary">
                                    <SelectValue placeholder="Select a committee" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="disec">
                                    Disarmament and International Security
                                    Committee (DISEC)
                                  </SelectItem>
                                  <SelectItem value="unhrc">
                                    United Nations Human Rights Council (UNHRC)
                                  </SelectItem>
                                  <SelectItem value="ecosoc">
                                    Economic and Social Council (ECOSOC)
                                  </SelectItem>
                                  <SelectItem value="ip">
                                    International Press (IP)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {["disec", "unhrc", "ecosoc"].includes(
                          form.getValues(`participants.${index}.committee`)
                        ) && (
                          <FormField
                            control={form.control}
                            name={`participants.${index}.priorExperiences`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  What are your prior experiences with
                                  MUNs/public speaking events?
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-primary/20 focus:border-primary"
                                    placeholder="Describe your experiences"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {form.getValues(`participants.${index}.committee`) ===
                          "ip" && (
                          <FormField
                            control={form.control}
                            name={`participants.${index}.role`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Role *
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-primary/20 focus:border-primary">
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="photographer">
                                      Photographer
                                    </SelectItem>
                                    <SelectItem value="journalist">
                                      Journalist
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <Separator className="my-6" />

                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-foreground/90">
                            Country Preferences
                          </h3>
                          <div className="grid gap-6 sm:grid-cols-3">
                            <FormField
                              control={form.control}
                              name={`participants.${index}.firstPreferenceCountry`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    1st Preference *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="border-primary/20 focus:border-primary"
                                      placeholder="First choice"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`participants.${index}.secondPreferenceCountry`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    2nd Preference *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="border-primary/20 focus:border-primary"
                                      placeholder="Second choice"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`participants.${index}.thirdPreferenceCountry`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    3rd Preference *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="border-primary/20 focus:border-primary"
                                      placeholder="Third choice"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
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
                            form.setValue("qrUsed", "qr1");
                          }}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                      )}

                      <div className="relative w-48 h-48">
                        <Image
                          src={
                            showFirstQR
                              ? "/images/payment/qr1min.jpg"
                              : "/images/payment/qr2min.jpg"
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
                            form.setValue("qrUsed", "qr2");
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
                      {registrationType === "multiple" && (
                        <p className="text-sm text-primary mt-2">
                          You&apos;re saving ₹599 with the group registration!
                        </p>
                      )}
                    </div>

                    <FormField
                      control={form.control}
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
                )}

                <div className="flex justify-between mt-8 pt-4 border-t border-border">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-primary/20 hover:bg-primary/5"
                    >
                      Previous
                    </Button>
                  )}
                  {step === 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto bg-primary hover:bg-primary/90"
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
                      className="ml-auto bg-primary hover:bg-primary/90"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
