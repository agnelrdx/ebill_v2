'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import { useEffect } from 'react';

import { VALID_EMAIL_ADDRESS_REGEX, cn } from 'utils';
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
import useLogin from 'hooks/useLogin';

type FormData = {
  email: string;
  password: string;
};

type CardProps = React.ComponentProps<typeof Card>;

export default function Login({ className, ...props }: CardProps) {
  const router = useRouter();
  const { mutate, isSuccess, isError, isPending } = useLogin();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isSuccess) router.push('/dashboard');
  }, [isSuccess, router]);

  const onSubmit = async ({ email, password }: FormData) => {
    mutate({ email, password });
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
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? 'Loading...' : 'Login'}
        </Button>
        {isError && (
          <div className="alert__error" role="alert">
            Invalid email or password. Please try again.
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
