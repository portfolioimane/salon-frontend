// app/admin/layout.tsx
import Link from "next/link";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout min-h-screen flex bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <aside className="sidebar w-64 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 text-white p-6 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-10">Salon ERP</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link href="/admin" className="block hover:text-yellow-200">Dashboard</Link></li>
            <li><Link href="/admin/bookings" className="block hover:text-yellow-200">Bookings</Link></li>
            <li><Link href="/admin/services" className="block hover:text-yellow-200">Services</Link></li>
            <li><Link href="/admin/gallery" className="block hover:text-yellow-200">Gallery</Link></li>
            <li><Link href="/admin/products" className="block hover:text-yellow-200">Products</Link></li>
            <li><Link href="/admin/employees" className="block hover:text-yellow-200">Employees</Link></li>
            <li><Link href="/admin/finance" className="block hover:text-yellow-200">Finance</Link></li>
            <li><Link href="/admin/marketing" className="block hover:text-yellow-200">marketing</Link></li>

          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
