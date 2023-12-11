import { useState } from 'react';

const usePostApi = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const _post = async (url: string, body: Record<string, string>) => {
    setError(false);
    setSuccess(false);

    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const { error, data } = await result.json();

    if (error) setError(true);

    if (!error) setSuccess(true);

    return data;
  };

  return { apiSuccess: success, apiError: error, _post };
};

export default usePostApi;
