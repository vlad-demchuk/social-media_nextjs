'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm, SignUpForm, SocialAuthButtons } from '@/features/auth/components';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState } from 'react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const { signIn, signUp, handleSocialAuth, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-foreground">
          <h1 className="text-4xl font-bold mb-4">Connect with the world</h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Join millions of people sharing their thoughts, ideas, and moments in real-time.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold mb-2">Welcome</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Card className="shadow-strong border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>
                Create an account or sign in to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as 'signin' | 'signup')}
                className="space-y-4"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <SignInForm onSubmit={signIn} isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <SignUpForm onSubmit={signUp} isLoading={isLoading} />
                </TabsContent>
              </Tabs>

              <SocialAuthButtons onSocialAuth={handleSocialAuth} />

              <p className="text-center text-sm text-muted-foreground mt-6">
                By continuing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}