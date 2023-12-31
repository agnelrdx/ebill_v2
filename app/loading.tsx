export default function Loading() {
  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center select-none">
        <div className="loader__icon"></div>
        <small>Loading...</small>
      </div>
    </main>
  );
}
