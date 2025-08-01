'use client';

// app/admin/layout.tsx
import Link from "next/link";
import "./admin.css";
import { checkAuth, logout } from '@/store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/navigation'; // <-- for App Router



export default function AdminLayout({ children }: { children: React.ReactNode }) {
       const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/'); // Redirect to home
    };

  return (
    <div className="admin-layout min-h-screen flex bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <aside className="sidebar w-64 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 text-white p-6 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-10">Salon ERP</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link href="/admin" className="block hover:text-yellow-200">Dashboard</Link></li>
            <li><Link href="/admin/businesshours" className="block hover:text-yellow-200">Business Hours</Link></li>
           <li><Link href="/admin/services" className="block hover:text-yellow-200">Services</Link></li>
            <li><Link href="/admin/bookings" className="block hover:text-yellow-200">Bookings</Link></li>
            <li><Link href="/admin/gallery" className="block hover:text-yellow-200">Gallery</Link></li>
            <li><Link href="/admin/inventory" className="block hover:text-yellow-200">Inventory</Link></li>
            <li><Link href="/admin/marketing" className="block hover:text-yellow-200">marketing</Link></li>
            <li><Link href="/admin/employees" className="block hover:text-yellow-200">Employees</Link></li>
            <li><Link href="/admin/finance" className="block hover:text-yellow-200">Finance</Link></li>

          </ul>
        </nav>
      </aside>
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-[#1E40AF] hover:text-[#CA8A04]"
                        target="_blank"
                    >
                        <i className="material-icons">public</i>
                        <span>View Website</span>
                    </Link>

                    <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500 hover:text-red-700">
                        <i className="material-icons">exit_to_app</i>
                        <span>Logout</span>
                    </button>
                </div>

                {/* Render the child pages here */}
    {children}
  </main>
    </div>
  );
}
