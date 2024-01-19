import { useMutation } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useForgotPassword = () => {
  const supabase = createClientComponentClient();
  const mutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw new Error(error.message);

      return data;
    },
  });

  return mutation;
};

export default useForgotPassword;
