import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { EyeCloseIcon, EyeIcon } from '../../../icons';
import { LoginCredentials, loginSchema } from '../../lib/schemas/auth/auth.schema';
import { useAuthStore } from '../../store/authStore';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';

interface SignInFormProps {
  isAdmin?: boolean;
}

export default function AdminSignInForm({ isAdmin = false }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setLoginError(null);
      await login({ ...data, isAdmin });
      navigate('/admin/dashboard');
    } catch (error: any) {
      // Extract error message from Laravel API response format
      const message =
        error?.response?.data?.message || // Laravel API error message
        error?.message || // Error object message
        'Invalid email or password'; // Fallback message
      setLoginError(message);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>
        <div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {loginError && (
                <div className="p-3 text-sm text-error-500 bg-error-500/10 border border-error-500 rounded-lg">
                  {loginError}
                </div>
              )}
              <div>
                <Label htmlFor="email">
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-error-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password">
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
                {errors.password && <p className="text-sm text-error-500 mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-end">
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div>
                <Button className="w-full" size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign in'}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
