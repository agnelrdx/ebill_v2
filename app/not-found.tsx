export default function NotFound() {
  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center">
        <h2 className="scroll-m-20 text-8xl font-extrabold tracking-tight">
          404
        </h2>
        <p className="text-xl leading-7 [&:not(:first-child)]:mt-2">
          Page Not Found ⚠️
        </p>
        <p className="text-base [&:not(:first-child)]:mt-1">
          We couldn&rsquo;t find the page you are looking for.
        </p>
      </div>
    </main>
  );
}
