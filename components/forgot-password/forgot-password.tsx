'use client';

import Link from 'next/link';
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

type CardProps = React.ComponentProps<typeof Card>;

export default function ForgotPassword({ className, ...props }: CardProps) {
  const { apiSuccess, apiError, _post } = usePostApi();
  const { handleSubmit, control, formState } = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });
  const formSubmitted =
    (formState.isSubmitting ||
      formState.isLoading ||
      formState.isSubmitSuccessful) &&
    !apiError;

  const onSubmit = async ({ email }: { email: string }) => {
    await _post('/api/auth/forgot-password', {
      email,
    });
  };

  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>Forgot Password?</CardTitle>
        <CardDescription>
          Please provide the email address that you used when you signed up for
          your account. We will send you an email that will allow you to reset
          your password.
        </CardDescription>
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
              className={classnames('mb-1', {
                ['border-red-500']: error,
              })}
              data-testid="email"
              disabled={apiSuccess}
            />
          )}
          rules={{
            required: true,
            pattern: VALID_EMAIL_ADDRESS_REGEX,
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
          {formSubmitted && !apiSuccess
            ? 'Loading...'
            : 'Request Reset Password'}
        </Button>
        {apiError && (
          <div className="alert__error" role="alert">
            Email does not exist. Please try again.
          </div>
        )}
        {apiSuccess && (
          <div className="alert__success" role="alert">
            Password reset email sent. Please check your email.
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
