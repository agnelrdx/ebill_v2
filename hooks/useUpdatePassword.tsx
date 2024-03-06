import { useMutation } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useUpdatePassword = () => {
  const supabase = createClientComponentClient();
  const mutation = useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw new Error(error.message);

      await supabase.auth.signOut();

      return data;
    },
  });

  return mutation;
};

export default useUpdatePassword;
