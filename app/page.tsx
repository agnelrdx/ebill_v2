import Login from 'components/login/login';

export default async function HomePage() {
  const year = new Date().getFullYear();

  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center">
        <Login />

        <p className="mt-4 text-center text-sm leading-7">
          © {year}, Made with ❤️ by Themecrispy
        </p>
      </div>
    </main>
  );
}
