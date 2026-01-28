import * as z from "zod";

export const priorityRegistrationSchema = z
  .object({
    targetAudience: z
      .union([z.literal("inHouse"), z.literal("otherCollege")])
      .refine(
        (val) => val !== undefined,
        { message: "Please select your registration type" }
      ),
    name: z
      .string()
      .min(1, { message: "Full name is required" })
      .max(50, { message: "Name is too long" }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .max(100, { message: "Email is too long" }),
    phone: z
      .string()
      .refine(
        value => /^\+?\d{10,15}$/.test(value),
        "Please enter a valid phone number"
      ),
    institution: z
      .string()
      .min(1, { message: "Institution is required" })
      .max(120, { message: "Institution name is too long" }),
    otherInstitution: z
      .string()
      .max(120, { message: "Institution name is too long" })
      .optional(),
    rollNumber: z
      .string()
      .max(10, { message: "Roll Number is too long" })
      .optional(),
    firstPreferenceCommittee: z
      .string()
      .min(1, { message: "First preference committee is required" }),
    secondPreferenceCommittee: z
      .string()
      .min(1, { message: "Second preference committee is required" }),
    thirdPreferenceCommittee: z
      .string()
      .min(1, { message: "Third preference committee is required" }),
    firstPreferenceCountry: z
      .string()
      .min(1, { message: "First preference country is required" })
      .max(50, { message: "Country name is too long" }),
    secondPreferenceCountry: z
      .string()
      .min(1, { message: "Second preference country is required" })
      .max(50, { message: "Country name is too long" }),
    thirdPreferenceCountry: z
      .string()
      .min(1, { message: "Third preference country is required" })
      .max(50, { message: "Country name is too long" }),
    priorMUNExperience: z
      .string()
      .min(1, { message: "Prior MUN experience is required" })
      .max(500, { message: "Prior experiences are too long" }),
    transportationRequired: z.enum(["yes", "no"]),
    foodPreference: z.enum(["veg", "nonveg"]),
    transactionId: z
      .string()
      .min(1, { message: "Transaction ID is required" })
      .max(50, { message: "Transaction ID is too long" }),
    paymentScreenshotUrl: z
      .string()
      .url({ message: "Payment screenshot upload is required" }),
  })
  .refine(
    data => {
      if (data.targetAudience === "inHouse") {
        return !!data.rollNumber;
      }
      return true;
    },
    {
      message: "Roll Number is required for In House registrations",
      path: ["rollNumber"],
    }
  )
  .refine(
    data => {
      if (data.targetAudience === "otherCollege") {
        if (data.institution === "Other") {
          return !!data.otherInstitution && data.otherInstitution.trim().length > 0;
        }
        return !!data.institution && data.institution.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please enter your institution name",
      path: ["otherInstitution"],
    }
  )
  .refine(
    data => {
      const { firstPreferenceCommittee, secondPreferenceCommittee, thirdPreferenceCommittee } =
        data;
      return (
        firstPreferenceCommittee !== secondPreferenceCommittee &&
        firstPreferenceCommittee !== thirdPreferenceCommittee &&
        secondPreferenceCommittee !== thirdPreferenceCommittee
      );
    },
    {
      message: "All three committee preferences must be different",
      path: ["thirdPreferenceCommittee"],
    }
  );

export type PriorityRegistrationSchema = z.infer<typeof priorityRegistrationSchema>;
