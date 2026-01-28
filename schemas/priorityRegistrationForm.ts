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
    // Country preferences for 1st preference committee
    firstPreferenceCommittee1stCountry: z
      .string()
      .min(1, { message: "1st preference country for 1st committee is required" })
      .max(50, { message: "Country name is too long" }),
    firstPreferenceCommittee2ndCountry: z
      .string()
      .min(1, { message: "2nd preference country for 1st committee is required" })
      .max(50, { message: "Country name is too long" }),
    firstPreferenceCommittee3rdCountry: z
      .string()
      .min(1, { message: "3rd preference country for 1st committee is required" })
      .max(50, { message: "Country name is too long" }),
    // Country preferences for 2nd preference committee
    secondPreferenceCommittee1stCountry: z
      .string()
      .min(1, { message: "1st preference country for 2nd committee is required" })
      .max(50, { message: "Country name is too long" }),
    secondPreferenceCommittee2ndCountry: z
      .string()
      .min(1, { message: "2nd preference country for 2nd committee is required" })
      .max(50, { message: "Country name is too long" }),
    secondPreferenceCommittee3rdCountry: z
      .string()
      .min(1, { message: "3rd preference country for 2nd committee is required" })
      .max(50, { message: "Country name is too long" }),
    // Country preferences for 3rd preference committee
    thirdPreferenceCommittee1stCountry: z
      .string()
      .min(1, { message: "1st preference country for 3rd committee is required" })
      .max(50, { message: "Country name is too long" }),
    thirdPreferenceCommittee2ndCountry: z
      .string()
      .min(1, { message: "2nd preference country for 3rd committee is required" })
      .max(50, { message: "Country name is too long" }),
    thirdPreferenceCommittee3rdCountry: z
      .string()
      .min(1, { message: "3rd preference country for 3rd committee is required" })
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
