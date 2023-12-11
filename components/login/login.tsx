'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import { VALID_EMAIL_ADDRESS_REGEX, cn } from 'utils';
import usePostApi from 'hooks/usePostApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';

type FormData = {
  email: string;
  password: string;
};

type CardProps = React.ComponentProps<typeof Card>;

export default function Login({ className, ...props }: CardProps) {
  const router = useRouter();
  const { apiError, _post } = usePostApi();
  const { handleSubmit, control, formState } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const formSubmitted =
    (formState.isSubmitting ||
      formState.isLoading ||
      formState.isSubmitSuccessful) &&
    !apiError;

  const onSubmit = async ({ email, password }: FormData) => {
    const isLoggedIn = await _post('/api/auth/login', {
      email,
      password,
    });
    if (isLoggedIn) router.push('/dashboard');
  };

  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <Image
          src="/img/logo.png"
          alt="Ebill"
          width={60}
          height={60}
          className="mb-8 mx-auto"
          priority={true}
        />
        <CardTitle>Welcome to Ebill</CardTitle>
        <CardDescription>Please sign-in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="email"
              placeholder="Enter your email"
              value={value}
              onChange={onChange}
              className={classnames('mb-3', {
                ['border-red-500']: error,
              })}
              data-testid="email"
            />
          )}
          rules={{
            required: true,
            pattern: VALID_EMAIL_ADDRESS_REGEX,
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="password"
              placeholder="Enter your password"
              value={value}
              onChange={onChange}
              autoComplete="off"
              className={classnames('mb-1', {
                ['border-red-500']: error,
              })}
              data-testid="password"
            />
          )}
          rules={{
            required: true,
          }}
        />
        <Link
          href="/forgot-password"
          className="text-sm inline-block mb-2 hover:underline"
        >
          Forgot Password?
        </Link>
      </CardContent>
      <CardFooter className="flex-col">
        <Button
          className="w-full"
          disabled={formSubmitted}
          onClick={handleSubmit(onSubmit)}
        >
          {formSubmitted ? 'Loading...' : 'Login'}
        </Button>
        {apiError && (
          <div className="alert__error" role="alert">
            Invalid email or password. Please try again.
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
