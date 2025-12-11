import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';

const authSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(72)
});

const emailSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
});

type FormErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type AuthMode = 'login' | 'signup' | 'forgot';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [resetSent, setResetSent] = useState(false);
  const { signIn, signUp, resetPassword, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  useEffect(() => {
    if (user && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, from]);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const newErrors: FormErrors = {};

    if (mode === 'forgot') {
      try {
        emailSchema.parse({ email });
      } catch (err) {
        if (err instanceof z.ZodError) {
          err.errors.forEach(e => {
            if (e.path[0] === 'email') newErrors.email = e.message;
          });
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsPending(false);
        return;
      }

      try {
        const { error } = await resetPassword(email);
        if (error) {
          toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } else {
          setResetSent(true);
          toast({ title: 'Email Sent', description: 'Check your inbox for the password reset link.' });
        }
      } catch {
        toast({ title: 'Error', description: 'An unexpected error occurred.', variant: 'destructive' });
      } finally {
        setIsPending(false);
      }
      return;
    }

    try {
      authSchema.parse({ email, password });
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach(e => {
          if (e.path[0] === 'email') newErrors.email = e.message;
          if (e.path[0] === 'password') newErrors.password = e.message;
        });
      }
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsPending(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          const message = error.message.includes('Invalid login credentials')
            ? 'Invalid email or password. Please try again.'
            : error.message;
          toast({ title: 'Login Failed', description: message, variant: 'destructive' });
        } else {
          toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
          navigate(from, { replace: true });
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          const message = error.message.includes('User already registered')
            ? 'An account with this email already exists. Please log in instead.'
            : error.message;
          toast({ title: 'Sign Up Failed', description: message, variant: 'destructive' });
        } else {
          toast({ title: 'Account Created!', description: 'Please check your email to confirm your account.' });
          setMode('login');
        }
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred. Please try again.', variant: 'destructive' });
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const getTitle = () => {
    if (mode === 'forgot') return 'Reset your password';
    if (mode === 'signup') return 'Create an account';
    return 'Welcome back';
  };

  const getSubtitle = () => {
    if (mode === 'forgot') return 'Enter your email and we\'ll send you a reset link';
    if (mode === 'signup') return 'Enter your email to get started';
    return 'Enter your credentials to access your account';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{getTitle()}</h1>
            <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
          </div>

          {mode !== 'forgot' && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </>
          )}

          {mode === 'forgot' && resetSent ? (
            <div className="space-y-4 text-center">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-sm text-foreground">
                  We've sent a password reset link to your email. Please check your inbox and follow the instructions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setMode('login'); setResetSent(false); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to login
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={isPending}
                    autoComplete="email"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                {mode !== 'forgot' && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      disabled={isPending}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      className={errors.password ? 'border-destructive' : ''}
                    />
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      disabled={isPending}
                      autoComplete="new-password"
                      className={errors.confirmPassword ? 'border-destructive' : ''}
                    />
                    {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                  </div>
                )}

                <Button type="submit" disabled={isPending} className="w-full text-xs font-thin border-0 rounded-sm">
                  {isPending ? 'Please wait...' : mode === 'forgot' ? 'Send Reset Link' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center space-y-2">
                {mode === 'forgot' ? (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to login
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Auth;
