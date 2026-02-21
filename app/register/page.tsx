'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FirstRoundRegistrationForm } from '@/components/register/FirstRoundRegistrationForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-10">
      <div className="container max-w-3xl mx-auto pt-10">
        <Card className="border-gray-800 shadow-xl bg-gray-900/80 backdrop-blur">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              First Round Registration
            </CardTitle>
            <p className="text-gray-300 text-sm sm:text-base">
              Register now for the First Round! Prices: In-House ₹800, Other
              Colleges ₹1300
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <FirstRoundRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
