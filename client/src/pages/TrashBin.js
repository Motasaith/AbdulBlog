import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import AdminHeader from "../components/AdminHeader";
import { 
  ArrowPathIcon, 
  TrashIcon, 
  CalendarIcon,
  ExclamationTriangleIcon,
  ArchiveBoxXMarkIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const TrashBin = () => {
  const [trashedPosts, setTrashedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrashedPosts();
  }, []);

  const fetchTrashedPosts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/posts/trash/all");
      setTrashedPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch trashed posts:", err);
      toast.error("Failed to load trashed posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (id, title) => {
    try {
      await api.put(`/api/posts/${id}/restore`);
      setTrashedPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success(`"${title}" restored successfully!`);
    } catch (err) {
      console.error("Restore failed:", err);
      toast.error("Failed to restore post.");
    }
  };

  const handlePermanentDelete = async (id, title) => {
    if (!window.confirm(`Permanently delete "${title}"? This action cannot be undone.`)) return;

    try {
      await api.delete(`/api/posts/${id}`);
      setTrashedPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success("Post permanently deleted.");
    } catch (err) {
      console.error("Permanent delete failed:", err);
      toast.error("Failed to delete permanently.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading trash...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <AdminHeader 
        title="Trash Bin" 
        subtitle="Restore or permanently delete posts"
        backTo="/admin/manage-posts"
        currentPage="trash"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          {/* Warning Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Posts in trash will be permanently deleted after 30 days
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  You can restore posts to bring them back or delete them permanently.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {trashedPosts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <ArchiveBoxXMarkIcon className="mx-auto h-16 w-16" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts in trash
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Posts you delete will appear here for 30 days before being permanently removed.
                </p>
                <Link
                  to="/admin/manage-posts"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Manage Posts
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {trashedPosts.map((post) => (
                  <div key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-48 md:flex-shrink-0">
                        <img
                          className="h-48 w-full md:h-full object-cover opacity-75"
                          src={post.thumbnail || post.image || "https://via.placeholder.com/400x200"}
                          alt={post.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200";
                          }}
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full">
                                In Trash
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {post.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Deleted: {new Date(post.deletedAt || post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleRestore(post._id, post.title)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                          >
                            <ArrowPathIcon className="h-4 w-4 mr-2" />
                            Restore
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(post._id, post.title)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete Forever
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Trash Management
              </h3>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Posts stay in trash for 30 days</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Restore posts to make them live again</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Permanent deletion cannot be undone</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/admin/manage-posts"
                  className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  ← Back to Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrashBin;
