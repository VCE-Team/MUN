import * as z from 'zod';

export const participantSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
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
    committee: z.string().min(1, { message: 'Please select a committee' }),
    firstPreferenceCountry: z
      .string()
      .min(1, { message: 'First preference country is required' })
      .max(50, { message: 'Country name is too long' }),
    secondPreferenceCountry: z
      .string()
      .min(1, { message: 'Second preference country is required' })
      .max(50, { message: 'Country name is too long' }),
    thirdPreferenceCountry: z
      .string()
      .min(1, { message: 'Third preference country is required' })
      .max(50, { message: 'Country name is too long' }),
    priorExperiences: z
      .string()
      .max(2000, { message: 'Prior experiences are too long' })
      .optional(),
    role: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.institution === 'Vardhaman College of Engineering') {
        return !!data.rollNumber;
      }
      return true;
    },
    {
      message: 'Roll Number is required for Vardhaman College of Engineering',
      path: ['rollNumber'],
    }
  )
  .refine(
    (data) => {
      if (data.committee === 'ip') {
        return !!data.role;
      }
      return true;
    },
    {
      message: 'Role is required for International Press',
      path: ['role'],
    }
  )
  .refine(
    (data) => {
      if (['disec', 'unhrc', 'aippm'].includes(data.committee)) {
        return !!data.priorExperiences;
      }
      return true;
    },
    {
      message: 'Prior experiences are required for this committee',
      path: ['priorExperiences'],
    }
  )
  .refine(
    (data) => {
      if (['disec', 'unhrc', 'aippm'].includes(data.committee)) {
        const text = data.priorExperiences || '';
        const words = text.trim().split(/\s+/).filter(Boolean);
        return words.length <= 300;
      }
      return true;
    },
    {
      message: 'Prior experiences must be at most 300 words',
      path: ['priorExperiences'],
    }
  );

export const formSchema = z.object({
  registrationType: z.enum(['single', 'multiple']),
  participants: z.array(participantSchema),
  transactionId: z
    .string()
    .min(1, { message: 'Transaction ID is required' })
    .max(50, { message: 'Transaction ID is too long' }),
  qrUsed: z.enum(['qr1', 'qr2']),
});

export type FormSchema = z.infer<typeof formSchema>;
