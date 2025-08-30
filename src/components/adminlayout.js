import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from './adminpanel/adminnavbar'; // or wherever your navbar is

const AdminLayout = () => {
  const location = useLocation();

  // Define the paths where the navbar should be shown
  const showNavbarPaths = [
    '/admin/manage-listings',
    '/admin/edit-property',
    '/admin/new-property',
    '/admin/metricas',
    '/admin/clientes',
  ];

  // Check if current path starts with one of the defined paths
  const showNavbar = showNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="admin-layout">
      {showNavbar && <AdminNavbar />}
      <Outlet />
    </div>
  );
};

export default AdminLayout;