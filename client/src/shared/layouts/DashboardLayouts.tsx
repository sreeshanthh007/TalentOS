import { Outlet } from 'react-router-dom';

export const SidebarLayout = ({ role }: { role: string }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-teal text-white p-4">
        <h2 className="text-xl font-bold mb-8">TalentOS {role}</h2>
        <nav>
          {/* Dashboard specific links */}
          <ul>
            <li className="mb-2">Dashboard</li>
            <li className="mb-2">Profile</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export const CandidateLayout = () => <SidebarLayout role="Candidate" />;
export const EmployerLayout = () => <SidebarLayout role="Employer" />;
export const AdminLayout = () => <SidebarLayout role="Admin" />;
