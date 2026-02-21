import * as z from 'zod';

export const priorityRegistrationSchema = z
  .object({
    targetAudience: z
      .union([z.literal('inHouse'), z.literal('otherCollege')])
      .refine((val) => val !== undefined, {
        message: 'Please select your registration type',
      }),
    name: z
      .string()
      .min(1, { message: 'Full name is required' })
      .max(50, { message: 'Name is too long' }),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .max(100, { message: 'Email is too long' }),
    phone: z
      .string()
      .refine(
        (value) => /^\+?\d{10,15}$/.test(value),
        'Please enter a valid phone number'
      ),
    institution: z
      .string()
      .min(1, { message: 'Institution is required' })
      .max(120, { message: 'Institution name is too long' }),
    otherInstitution: z
      .string()
      .max(120, { message: 'Institution name is too long' })
      .optional(),
    rollNumber: z
      .string()
      .max(10, { message: 'Roll Number is too long' })
      .optional(),
    firstPreferenceCommittee: z
      .string()
      .min(1, { message: 'First preference committee is required' }),
    secondPreferenceCommittee: z
      .string()
      .min(1, { message: 'Second preference committee is required' }),
    thirdPreferenceCommittee: z
      .string()
      .min(1, { message: 'Third preference committee is required' }),
    // Allocation preferences for 1st committee (countries when not IP, or IP role when IP)
    firstPreferenceCommittee1stCountry: z.string().max(50).optional(),
    firstPreferenceCommittee2ndCountry: z.string().max(50).optional(),
    firstPreferenceCommittee3rdCountry: z.string().max(50).optional(),
    firstPreferenceCommitteeIPRole: z
      .enum(['photographer', 'journalist'])
      .optional(),
    secondPreferenceCommittee1stCountry: z.string().max(50).optional(),
    secondPreferenceCommittee2ndCountry: z.string().max(50).optional(),
    secondPreferenceCommittee3rdCountry: z.string().max(50).optional(),
    secondPreferenceCommitteeIPRole: z
      .enum(['photographer', 'journalist'])
      .optional(),
    thirdPreferenceCommittee1stCountry: z.string().max(50).optional(),
    thirdPreferenceCommittee2ndCountry: z.string().max(50).optional(),
    thirdPreferenceCommittee3rdCountry: z.string().max(50).optional(),
    thirdPreferenceCommitteeIPRole: z
      .enum(['photographer', 'journalist'])
      .optional(),
    priorMUNExperience: z
      .string()
      .min(1, { message: 'Prior MUN experience is required' })
      .max(2000, { message: 'Prior experiences are too long' }),
    transportationRequired: z.enum(['yes', 'no']),
    foodPreference: z.enum(['veg', 'nonveg']),
    transactionId: z
      .string()
      .min(1, { message: 'Transaction ID is required' })
      .max(50, { message: 'Transaction ID is too long' }),
    paymentScreenshotUrl: z
      .string()
      .url({ message: 'Payment screenshot upload is required' }),
  })
  .refine(
    (data) => {
      if (data.targetAudience === 'inHouse') {
        return !!data.rollNumber;
      }
      return true;
    },
    {
      message: 'Roll Number is required for In House registrations',
      path: ['rollNumber'],
    }
  )
  .refine(
    (data) => {
      const text = data.priorMUNExperience || '';
      const words = text.trim().split(/\s+/).filter(Boolean);
      return words.length <= 300;
    },
    {
      message: 'Prior experience must be at most 300 words',
      path: ['priorMUNExperience'],
    }
  )
  .refine(
    (data) => {
      if (data.targetAudience === 'otherCollege') {
        if (data.institution === 'Other') {
          return (
            !!data.otherInstitution && data.otherInstitution.trim().length > 0
          );
        }
        return !!data.institution && data.institution.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Please enter your institution name',
      path: ['otherInstitution'],
    }
  )
  .refine(
    (data) => {
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
      message: 'All three committee preferences must be different',
      path: ['thirdPreferenceCommittee'],
    }
  )
  .refine(
    (data) => {
      if (data.firstPreferenceCommittee === 'ip') {
        return (
          data.firstPreferenceCommitteeIPRole === 'photographer' ||
          data.firstPreferenceCommitteeIPRole === 'journalist'
        );
      }
      const c1 = data.firstPreferenceCommittee1stCountry?.trim();
      const c2 = data.firstPreferenceCommittee2ndCountry?.trim();
      const c3 = data.firstPreferenceCommittee3rdCountry?.trim();
      return !!c1 && !!c2 && !!c3;
    },
    {
      message:
        '1st committee: choose Photographer or Journalist for IP, or enter 3 allocation preferences for other committees',
      path: ['firstPreferenceCommitteeIPRole'],
    }
  )
  .refine(
    (data) => {
      if (data.secondPreferenceCommittee === 'ip') {
        return (
          data.secondPreferenceCommitteeIPRole === 'photographer' ||
          data.secondPreferenceCommitteeIPRole === 'journalist'
        );
      }
      const c1 = data.secondPreferenceCommittee1stCountry?.trim();
      const c2 = data.secondPreferenceCommittee2ndCountry?.trim();
      const c3 = data.secondPreferenceCommittee3rdCountry?.trim();
      return !!c1 && !!c2 && !!c3;
    },
    {
      message:
        '2nd committee: choose Photographer or Journalist for IP, or enter 3 allocation preferences for other committees',
      path: ['secondPreferenceCommitteeIPRole'],
    }
  )
  .refine(
    (data) => {
      if (data.thirdPreferenceCommittee === 'ip') {
        return (
          data.thirdPreferenceCommitteeIPRole === 'photographer' ||
          data.thirdPreferenceCommitteeIPRole === 'journalist'
        );
      }
      const c1 = data.thirdPreferenceCommittee1stCountry?.trim();
      const c2 = data.thirdPreferenceCommittee2ndCountry?.trim();
      const c3 = data.thirdPreferenceCommittee3rdCountry?.trim();
      return !!c1 && !!c2 && !!c3;
    },
    {
      message:
        '3rd committee: choose Photographer or Journalist for IP, or enter 3 allocation preferences for other committees',
      path: ['thirdPreferenceCommitteeIPRole'],
    }
  );

export type PriorityRegistrationSchema = z.infer<
  typeof priorityRegistrationSchema
>;
