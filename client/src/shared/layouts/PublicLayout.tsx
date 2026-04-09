import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-teal text-white">TalentOS Header</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="p-4 bg-teal-dark text-white">TalentOS Footer</footer>
    </div>
  );
};
