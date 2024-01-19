'use client';

import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';

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

type CardProps = React.ComponentProps<typeof Card>;

export default function UpdatePassword({ className, ...props }: CardProps) {
  const apiSuccess = false;
  const apiError = false;
  const { handleSubmit, control, formState, getValues } = useForm<{
    password: string;
    newPassword: string;
  }>({
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });
  const formSubmitted =
    (formState.isSubmitting ||
      formState.isLoading ||
      formState.isSubmitSuccessful) &&
    !apiError;

  const onSubmit = async ({ newPassword }: { newPassword: string }) => {
    // await _post('/api/auth/update-password', {
    //   password: newPassword,
    //   nonce: code!,
    // });
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
              disabled={apiSuccess}
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
              disabled={apiSuccess}
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
        <Link href="/" className="text-sm inline-block mb-2 hover:underline">
          Return to Login
        </Link>
      </CardContent>
      <CardFooter className="flex-col">
        <Button
          className="w-full"
          disabled={formSubmitted || apiSuccess}
          onClick={handleSubmit(onSubmit)}
        >
          {formSubmitted && !apiSuccess ? 'Loading...' : 'Update Password'}
        </Button>
        {apiError && (
          <div className="alert__error" role="alert">
            System error. Please try again.
          </div>
        )}
        {apiSuccess && (
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
