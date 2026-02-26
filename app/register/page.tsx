'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-10">
      <div className="container max-w-3xl mx-auto pt-10">
        <Card className="border-red-800 shadow-xl bg-gray-900/80 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Registrations Closed
            </CardTitle>
            <p className="text-gray-300 text-base sm:text-lg">
              Thank you for your interest in VCEMUN 2026!
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6 text-center">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Registrations for VCEMUN 2026 have been closed. We received an
                overwhelming response and all committee positions have been
                filled.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                The conference will be held on{' '}
                <span className="font-bold text-amber-400">
                  February 27th & 28th, 2026
                </span>
                .
              </p>
            </div>

            <div className="pt-4">
              <Link href="/">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-2">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
