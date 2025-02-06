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
    <div className="container max-w-2xl mt-[10vh] mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Register for VCEMUN</h1>
        <p className="text-muted-foreground">
          Join us in this diplomatic journey
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 XXXXXXXXXX" {...field} />
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
                    <FormLabel>Institution *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your School/College" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="committee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Committee *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
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
              <FormField
                control={form.control}
                name="firstPreferenceCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1st Preference Country *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your 1st preference country"
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
                    <FormLabel>2nd Preference Country *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your 2nd preference country"
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
                    <FormLabel>3rd Preference Country *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your 3rd preference country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel className="mt-3">
                Registration fee is Rupees 599
              </FormLabel>
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Payment</h2>
              <p>Please scan the QR code below to make the payment:</p>
              <div className="flex justify-center">
                <Image
                  src="/images/qr-1.jpg"
                  alt="Payment QR Code"
                  width={200}
                  height={200}
                />
                <p>To pay for registration: Rs. 599</p>
              </div>
              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID *</FormLabel>
                    <FormControl>
                      <Input
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

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step === 1 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Continue to Payment
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Finish Registration
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
