import * as z from "zod";

/**
 * First Round Registration Form Schema
 * Validates all registration data for First Round participants
 *
 * Prices:
 * - In-House (VCE): ₹800
 * - Other Colleges: ₹1300
 */
export const firstRoundRegistrationSchema = z
  .object({
    // Registration type validation
    targetAudience: z
      .union([z.literal("inHouse"), z.literal("otherCollege")])
      .refine(val => val !== undefined, {
        message: "Please select your registration type",
      }),

    // Personal Information
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
        "Please enter a valid phone number (10-15 digits)",
      ),

    // Institution Information
    institution: z
      .string()
      .min(1, { message: "Institution is required" })
      .max(120, { message: "Institution name is too long" }),
    otherInstitution: z
      .string()
      .max(120, { message: "Institution name is too long" })
      .optional(),

    // In-house participant roll number
    rollNumber: z
      .string()
      .max(10, { message: "Roll Number is too long" })
      .optional(),

    // Committee Preferences (1st, 2nd, 3rd choice)
    firstPreferenceCommittee: z
      .string()
      .min(1, { message: "First preference committee is required" }),
    secondPreferenceCommittee: z
      .string()
      .min(1, { message: "Second preference committee is required" }),
    thirdPreferenceCommittee: z
      .string()
      .min(1, { message: "Third preference committee is required" }),

    // 1st Committee Allocation Preferences (countries or IP role)
    firstPreferenceCommittee1stCountry: z.string().max(50).optional(),
    firstPreferenceCommittee2ndCountry: z.string().max(50).optional(),
    firstPreferenceCommittee3rdCountry: z.string().max(50).optional(),
    firstPreferenceCommitteeIPRole: z
      .enum(["photographer", "journalist"])
      .optional(),

    // 2nd Committee Allocation Preferences (countries or IP role)
    secondPreferenceCommittee1stCountry: z.string().max(50).optional(),
    secondPreferenceCommittee2ndCountry: z.string().max(50).optional(),
    secondPreferenceCommittee3rdCountry: z.string().max(50).optional(),
    secondPreferenceCommitteeIPRole: z
      .enum(["photographer", "journalist"])
      .optional(),

    // 3rd Committee Allocation Preferences (countries or IP role)
    thirdPreferenceCommittee1stCountry: z.string().max(50).optional(),
    thirdPreferenceCommittee2ndCountry: z.string().max(50).optional(),
    thirdPreferenceCommittee3rdCountry: z.string().max(50).optional(),
    thirdPreferenceCommitteeIPRole: z
      .enum(["photographer", "journalist"])
      .optional(),

    // Experience & Preferences
    priorMUNExperience: z
      .string()
      .min(1, { message: "Prior MUN experience is required" })
      .max(2000, { message: "Prior experiences are too long" }),
    transportationRequired: z.enum(["yes", "no"]),
    foodPreference: z.enum(["veg", "nonveg"]),

    // Payment Information
    transactionId: z
      .string()
      .min(1, { message: "Transaction ID is required" })
      .max(50, { message: "Transaction ID is too long" }),
    paymentScreenshotUrl: z
      .string()
      .min(1, { message: "Payment screenshot is required" }),
  })
  // Roll number required for in-house participants
  .refine(
    data => {
      if (data.targetAudience === "inHouse") {
        return !!data.rollNumber && data.rollNumber.trim().length > 0;
      }
      return true;
    },
    {
      message: "Roll Number is required for In House registrations",
      path: ["rollNumber"],
    },
  )
  // Prior experience word count validation (max 300 words)
  .refine(
    data => {
      const text = data.priorMUNExperience || "";
      const words = text.trim().split(/\s+/).filter(Boolean);
      return words.length <= 300;
    },
    {
      message: "Prior experience must be at most 300 words",
      path: ["priorMUNExperience"],
    },
  )
  // Institution validation for other colleges
  .refine(
    data => {
      if (data.targetAudience === "otherCollege") {
        if (data.institution === "Other") {
          return (
            !!data.otherInstitution && data.otherInstitution.trim().length > 0
          );
        }
        return !!data.institution && data.institution.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please enter your institution name",
      path: ["otherInstitution"],
    },
  )
  // All three committees must be different
  .refine(
    data => {
      const {
        firstPreferenceCommittee,
        secondPreferenceCommittee,
        thirdPreferenceCommittee,
      } = data;
      return (
        firstPreferenceCommittee !== secondPreferenceCommittee &&
        firstPreferenceCommittee !== thirdPreferenceCommittee &&
        secondPreferenceCommittee !== thirdPreferenceCommittee
      );
    },
    {
      message: "All three committee preferences must be different",
      path: ["thirdPreferenceCommittee"],
    },
  )
  // 1st Committee allocation validation
  .refine(
    data => {
      if (data.firstPreferenceCommittee === "ip") {
        return (
          data.firstPreferenceCommitteeIPRole === "photographer" ||
          data.firstPreferenceCommitteeIPRole === "journalist"
        );
      }
      const c1 = data.firstPreferenceCommittee1stCountry?.trim();
      const c2 = data.firstPreferenceCommittee2ndCountry?.trim();
      const c3 = data.firstPreferenceCommittee3rdCountry?.trim();
      return !!c1 && !!c2 && !!c3;
    },
    {
      message:
        "1st committee: choose Photographer or Journalist for IP, or enter 3 allocation preferences for other committees",
      path: ["firstPreferenceCommitteeIPRole"],
    },
  )
  // 2nd Committee allocation validation
  .refine(
    data => {
      if (data.secondPreferenceCommittee === "ip") {
        return (
          data.secondPreferenceCommitteeIPRole === "photographer" ||
          data.secondPreferenceCommitteeIPRole === "journalist"
        );
      }
      const c1 = data.secondPreferenceCommittee1stCountry?.trim();
      const c2 = data.secondPreferenceCommittee2ndCountry?.trim();
      const c3 = data.secondPreferenceCommittee3rdCountry?.trim();
      return !!c1 && !!c2 && !!c3;
    },
    {
      message:
        "2nd committee: choose Photographer or Journalist for IP, or enter 3 allocation preferences for other committees",
      path: ["secondPreferenceCommitteeIPRole"],
    },
  )
  // 3rd Committee allocation validation
  .refine(
    data => {
      if (data.thirdPreferenceCommittee === "ip") {
        return (
          data.thirdPreferenceCommitteeIPRole === "photographer" ||
          data.thirdPreferenceCommitteeIPRole === "journalist"
        );
      }
      const c1 = data.thirdPreferenceCommittee1stCountry?.trim();
      const c2 = data.thirdPreferenceCommittee2ndCountry?.trim();
      const c3 = data.thirdPreferenceCommittee3rdCountry?.trim();
      return !!c1 && !!c2 && !!c3;
    },
    {
      message:
        "3rd committee: choose Photographer or Journalist for IP, or enter 3 allocation preferences for other committees",
      path: ["thirdPreferenceCommitteeIPRole"],
    },
  );

/**
 * Type-safe inference from the Zod schema
 * Use this type for form state, API payloads, and database documents
 */
export type FirstRoundRegistrationSchema = z.infer<
  typeof firstRoundRegistrationSchema
>;
