"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, Lock, ArrowRight, KeyRound } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  }

  async function onGoogleLogin() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:grid lg:grid-cols-2 lg:px-0 overflow-hidden">
      
      {/* Mobile/Tablet Background Image (hidden on desktop lg) */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Real Estate Luxury Home Mobile Background"
          fill
          sizes="(max-width: 1024px) 100vw, 1px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px]" />
      </div>

      {/* Left Side: Creative Image & Branding (Desktop only) */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Real Estate Luxury Home"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
        </div>
        
        <div className="relative z-20 flex items-center gap-2 text-2xl font-bold">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="tracking-tight font-extrabold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">Madhusudha Infra</span>
        </div>
        
        <div className="relative z-20 mt-auto">
          <div className="space-y-6">
            <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl text-white leading-tight">
              Manage properties with <span className="font-semibold">elegance</span> & <span className="text-white font-semibold">precision</span>.
            </h1>
            <p className="text-lg text-slate-200/90 max-w-lg">
              Empowering real estate professionals with state-of-the-art tools to track leads, manage listings, and close deals faster.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium">
            <div className="flex -space-x-4">
              <div className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-200">
                <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Agent" width={40} height={40} className="rounded-full object-cover" />
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-200">
                <Image src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Agent" width={40} height={40} className="rounded-full object-cover" />
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-200">
                <Image src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Agent" width={40} height={40} className="rounded-full object-cover" />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-primary text-xs font-bold text-primary-foreground">
                +2k
              </div>
            </div>
            <p className="text-slate-200">Joined by top agents worldwide</p>
          </div>
        </div>
      </div>

      {/* Right Side: Authentication Forms (Desktop has Dot Texture background, Mobile is transparent to show background) */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4 sm:p-8 lg:p-12 lg:bg-slate-50/60 lg:dark:bg-slate-950/60 lg:bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] lg:[background-size:24px_24px] lg:dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)]">
        
        {/* Mobile-only Header Logo */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xl font-bold text-white lg:hidden">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="tracking-tight font-extrabold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">Madhusudha Infra</span>
        </div>

        {/* Glassmorphic Auth Card */}
        <div className="w-full max-w-[440px] rounded-2xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-950/70 sm:p-8 lg:border-slate-200/50 lg:bg-white/70 lg:shadow-xl lg:backdrop-blur-lg lg:dark:border-slate-800/50 lg:dark:bg-slate-950/60">
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg">
              <TabsTrigger 
                value="agent" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-white"
              >
                Agent Login
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-white"
              >
                Admin Portal
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="agent" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
              <div className="grid gap-6">
                <form onSubmit={onSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="agent-email" className="text-slate-700 dark:text-slate-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <Input
                          id="agent-email"
                          placeholder="agent@luxecrm.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="pl-9 bg-white/55 dark:bg-slate-900/55 border-slate-200/80 dark:border-slate-800/80"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="agent-password" className="text-slate-700 dark:text-slate-300">Password</Label>
                        <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <Input
                          id="agent-password"
                          type="password"
                          disabled={isLoading}
                          className="pl-9 bg-white/55 dark:bg-slate-900/55 border-slate-200/80 dark:border-slate-800/80"
                          required
                        />
                      </div>
                    </div>
                    <Button disabled={isLoading} className="mt-2 w-full h-11 text-base group cursor-pointer">
                      {isLoading && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                      )}
                      Sign In as Agent
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200/80 dark:border-slate-800/80" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-slate-500 dark:text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  type="button" 
                  disabled={isLoading} 
                  onClick={onGoogleLogin}
                  className="w-full h-11 bg-white/55 dark:bg-slate-900/55 border-slate-200/80 dark:border-slate-800/80 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                  )}
                  Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
              <div className="grid gap-6">
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 mb-2 flex items-start gap-3">
                  <KeyRound className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-primary">Admin Access Only</p>
                    <p className="text-slate-600 dark:text-slate-400">Authorized personnel only. Activities are monitored.</p>
                  </div>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email" className="text-slate-700 dark:text-slate-300">Admin ID or Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <Input
                          id="admin-email"
                          placeholder="admin@luxecrm.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="pl-9 bg-white/55 dark:bg-slate-900/55 border-slate-200/80 dark:border-slate-800/80"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-password" className="text-slate-700 dark:text-slate-300">Secure Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <Input
                          id="admin-password"
                          type="password"
                          disabled={isLoading}
                          className="pl-9 bg-white/55 dark:bg-slate-900/55 border-slate-200/80 dark:border-slate-800/80"
                          required
                        />
                      </div>
                    </div>
                    <Button disabled={isLoading} className="mt-2 w-full h-11 text-base cursor-pointer" variant="default">
                      {isLoading && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                      )}
                      Authorize Access
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
          </Tabs>

          <p className="px-8 text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
