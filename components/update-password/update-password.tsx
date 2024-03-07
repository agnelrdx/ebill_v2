'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';

import { VALID_PASSWORD_REGEX, cn } from 'utils';
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
import { useToast } from 'components/ui/use-toast';
import useUpdatePassword from 'hooks/useUpdatePassword';

type CardProps = React.ComponentProps<typeof Card>;

export default function UpdatePassword({ className, ...props }: CardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isSuccess, isError, isPending, error } = useUpdatePassword();
  const { handleSubmit, control, formState, getValues } = useForm<{
    password: string;
    newPassword: string;
  }>({
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess) {
      toast({
        title: 'You will be redirected to home page soon!',
        duration: 5000,
      });
      timer = setTimeout(() => {
        router.push('/');
      }, 8000);
    }
    () => clearTimeout(timer);
  }, [isSuccess, router, toast]);

  const onSubmit = async ({ password }: { password: string }) => {
    mutate({ password });
  };

  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>
          Please update your password. The password must be a minimum of 6
          characters long and include a combination of an uppercase letter, a
          lowercase letter, a special character, and a numeric digit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="password"
              placeholder="Enter your new password"
              value={value}
              onChange={onChange}
              className={classnames('mb-3', {
                ['border-red-500']: error,
              })}
              data-testid="password"
            />
          )}
          rules={{
            required: true,
            pattern: VALID_PASSWORD_REGEX,
            minLength: 6,
          }}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="password"
              placeholder="Confirm your password"
              value={value}
              onChange={onChange}
              className={classnames('mb-1', {
                ['border-red-500']: error,
              })}
              data-testid="newPassword"
            />
          )}
          rules={{
            required: true,
            pattern: VALID_PASSWORD_REGEX,
            minLength: 6,
            validate: (value) => {
              const { password } = getValues();
              return password === value;
            },
          }}
        />
      </CardContent>
      <CardFooter className="flex-col">
        <Button
          disabled={isPending || isSuccess}
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? 'Loading...' : 'Update Password'}
        </Button>
        {isError && (
          <div className="alert__error" role="alert">
            {error?.message || 'System error. Please try again.'}
          </div>
        )}
        {isSuccess && (
          <div className="alert__success" role="alert">
            Password updated successfully. Please{' '}
            <Link href="/" className="inline-block hover:underline">
              login now.
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
