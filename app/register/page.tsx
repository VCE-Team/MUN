"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen mt-[4rem] bg-gradient-to-b from-black to-gray-900 px-4 py-8">
      <div className="container max-w-3xl mx-auto">
        <Card className="border-gray-700 shadow-lg bg-gray-800">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Registrations Closed
            </CardTitle>
            <p className="text-gray-400 text-sm sm:text-base">
              The registration form is no longer accepting responses. Thank you
              for your interest in VCEMUN!
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-center text-gray-400 text-sm sm:text-base">
                Explore more about VCEMUN using the links below:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/committees/disec"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  DISEC
                </Link>
                <Link
                  href="/"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/committees/unhrc"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  UNHRC
                </Link>
                <Link
                  href="/chairs"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Chairs
                </Link>
                <Link
                  href="/committees/ecosoc"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  ECOSOC
                </Link>
                <Link
                  href="/usg"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  USGs
                </Link>
                <Link
                  href="/committees/international-press"
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  International Press
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
