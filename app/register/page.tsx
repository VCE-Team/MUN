"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/register/RegistrationForm";

export default function RegisterPage() {
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
              <div className={`h-2 w-16 rounded-full bg-primary`} />
              <div className={`h-2 w-16 rounded-full bg-primary/30`} />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <RegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
