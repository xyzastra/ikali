import { useState, useEffect, useActionState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';

const authSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(72)
});

type FormState = {
  success: boolean;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  message?: string;
  action?: 'login' | 'signup';
};

const initialState: FormState = {
  success: false,
  errors: {},
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const authAction = async (
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const isLoginMode = formData.get('isLogin') === 'true';

    // Validation
    const newErrors: FormState['errors'] = {};
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

    if (!isLoginMode && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      return { success: false, errors: newErrors };
    }

    try {
      if (isLoginMode) {
        const { error } = await signIn(email, password);
        if (error) {
          const message = error.message.includes('Invalid login credentials')
            ? 'Invalid email or password. Please try again.'
            : error.message;
          return { success: false, errors: {}, message, action: 'login' };
        }
        return { success: true, errors: {}, message: 'Welcome back!', action: 'login' };
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          const message = error.message.includes('User already registered')
            ? 'An account with this email already exists. Please log in instead.'
            : error.message;
          return { success: false, errors: {}, message, action: 'signup' };
        }
        return { success: true, errors: {}, message: 'Please check your email to confirm your account.', action: 'signup' };
      }
    } catch {
      return { success: false, errors: {}, message: 'An unexpected error occurred. Please try again.' };
    }
  };

  const [state, formAction, isPending] = useActionState(authAction, initialState);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, from]);

  // Handle success/error toasts and navigation
  useEffect(() => {
    if (state.success) {
      toast({
        title: state.action === 'login' ? 'Welcome back!' : 'Account Created!',
        description: state.message,
      });
      if (state.action === 'login') {
        navigate(from, { replace: true });
      } else {
        setIsLogin(true);
      }
    } else if (state.message) {
      toast({
        title: state.action === 'login' ? 'Login Failed' : 'Sign Up Failed',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, navigate, from]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Enter your credentials to access your account' : 'Enter your email to get started'}
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="isLogin" value={String(isLogin)} />
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                disabled={isPending}
                autoComplete="email"
                className={state.errors.email ? 'border-destructive' : ''}
              />
              {state.errors.email && <p className="text-xs text-destructive">{state.errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                disabled={isPending}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                className={state.errors.password ? 'border-destructive' : ''}
              />
              {state.errors.password && <p className="text-xs text-destructive">{state.errors.password}</p>}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  disabled={isPending}
                  autoComplete="new-password"
                  className={state.errors.confirmPassword ? 'border-destructive' : ''}
                />
                {state.errors.confirmPassword && <p className="text-xs text-destructive">{state.errors.confirmPassword}</p>}
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full text-xs font-thin border-0 rounded-sm">
              {isPending ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
