'use client';

import { Button } from 'components/ui/button';

export default function Error() {
  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center">
        <h2 className="scroll-m-20 text-8xl font-extrabold tracking-tight">
          500
        </h2>
        <p className="text-xl font-medium [&:not(:first-child)]:mt-2">
          Internal server error 👨🏻‍💻
        </p>
        <p className="text-base leading-7 [&:not(:first-child)]:mt-1">
          Oops, something went wrong! Please try agin later.
        </p>
        <Button onClick={() => location.reload()} className="mt-3">
          Try again
        </Button>
      </div>
    </main>
  );
}
