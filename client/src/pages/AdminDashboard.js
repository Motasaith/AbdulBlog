import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  DocumentTextIcon, 
  PlusIcon, 
  TrashIcon, 
  UserIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    toast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      setIsLoading(false);
      toast.dismiss();
      toast.success('Logged out successfully');
      navigate("/");
    }, 1000);
  };

  const adminMenuItems = [
    {
      title: 'Manage Blog Posts',
      description: 'View, edit, and organize your blog posts',
      icon: DocumentTextIcon,
      link: '/admin/manage-posts',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Add New Post',
      description: 'Create and publish a new blog post',
      icon: PlusIcon,
      link: '/admin/add-post',
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600'
    },
    {
      title: 'Trash Bin',
      description: 'Restore deleted posts within 30 days',
      icon: TrashIcon,
      link: '/admin/trash',
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600'
    },
    {
      title: 'Edit Profile',
      description: 'Update profile details shown on the blog',
      icon: UserIcon,
      link: '/admin/profile',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Register New Admin',
      description: 'Create new admin account for site access',
      icon: PlusCircleIcon,
      link: '/admin/register',
      color: 'from-indigo-600 to-indigo-700',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconColor: 'text-indigo-600'
    }
  ];

  const superAdminItems = [
    {
      title: 'Contact Messages',
      description: 'View and respond to messages from readers',
      icon: ChatBubbleLeftRightIcon,
      link: '/admin/messages',
      color: 'from-cyan-600 to-cyan-700',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      iconColor: 'text-cyan-600'
    },
    {
      title: 'Site Statistics',
      description: 'Track blog traffic and post engagement',
      icon: ChartBarIcon,
      link: '/admin/stats',
      color: 'from-yellow-600 to-yellow-700',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Manage Admins',
      description: 'View or remove admin accounts',
      icon: UserGroupIcon,
      link: '/admin/manage-admins',
      color: 'from-pink-600 to-pink-700',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      iconColor: 'text-pink-600'
    }
  ];

  const allMenuItems = role === "admin" ? [...adminMenuItems, ...superAdminItems] : adminMenuItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
<AdminHeader title="Admin Dashboard" subtitle="Manage and oversee all blog activities" currentPage="dashboard" showBackButton={false} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Manage your blog content, monitor analytics, and control user access all from one central location
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">{allMenuItems.length}</div>
              <div className="text-sm text-blue-100">Available Tools</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold capitalize">{role || 'Editor'}</div>
              <div className="text-sm text-blue-100">Access Level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quick Actions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from the options below to manage your blog
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${item.bgColor} p-3 rounded-xl`}>
                    <IconComponent className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{background: `linear-gradient(to right, ${item.color.replace('from-', '').replace('to-', ', ')})`}}></div>
              </Link>
            );
          })}
        </div>

        {/* Admin Status Card */}
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Admin Status
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                You are logged in as {role === 'admin' ? 'a Super Administrator' : 'an Editor'} with {role === 'admin' ? 'full' : 'limited'} access to site management tools.
              </p>
              {role !== 'admin' && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                  Contact a Super Admin for elevated permissions.
                </p>
              )}
            </div>
            <div className="hidden sm:block">
              <div className={`w-16 h-16 rounded-full ${role === 'admin' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'} flex items-center justify-center`}>
                <UserIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 AbdulBlog. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Admin Dashboard - Manage your blog with ease
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
