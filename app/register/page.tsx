"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
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
  transactionId: z.string().min(1, { message: "Transaction ID is required" }),
});

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      institution: "",
      committee: "",
      firstPreferenceCountry: "",
      secondPreferenceCountry: "",
      thirdPreferenceCountry: "",
      transactionId: "",
    },
  });

  const checkEmailExists = async (email: string) => {
    const response = await fetch(
      `https://munvcebackend.onrender.com/api/check-email?email=${encodeURIComponent(
        email
      )}`
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data.exists;
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger([
        "name",
        "email",
        "phone",
        "institution",
        "committee",
        "firstPreferenceCountry",
        "secondPreferenceCountry",
        "thirdPreferenceCountry",
      ]);

      if (isValid) {
        const emailExists = await checkEmailExists(form.getValues("email"));
        if (emailExists) {
          toast({
            title: "Email already used for registration",
            description: "Please try another email.",
            variant: "destructive",
          });
          return;
        }
      }
    }

    if (isValid) {
      setStep(2);
    } else {
      toast({
        title: "Validation Error",
        description: "Please check all the fields properly.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "https://munvcebackend.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
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
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration.",
        variant: "destructive",
      });
    }
  }

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
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
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
                        name="email"
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
                        control={form.control}
                        name="institution"
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
                      name="committee"
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
                                Disarmament and International Security Committee
                                (DISEC)
                              </SelectItem>
                              <SelectItem value="unhrc">
                                United Nations Human Rights Council (UNHRC)
                              </SelectItem>
                              <SelectItem value="ecosoc">
                                Economic and Social Council (ECOSOC)
                              </SelectItem>
                              <SelectItem value="lok">
                                International Press (IP)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-6" />

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-foreground/90">
                        Country Preferences
                      </h3>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="firstPreferenceCountry"
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
                          name="secondPreferenceCountry"
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
                          name="thirdPreferenceCountry"
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

                    <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Registration fee: ₹599
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
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-6 bg-secondary/10 rounded-lg">
                      <div className="relative w-48 h-48">
                        <Image
                          src="/images/qr-1.jpg"
                          alt="Payment QR Code"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-lg font-semibold text-foreground/90">
                          Amount: ₹599
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Scan to pay via UPI
                        </p>
                      </div>
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
                    >
                      Continue to Payment
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto bg-primary hover:bg-primary/90"
                    >
                      Complete Registration
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
