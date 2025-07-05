import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import ManagePosts from "./pages/ManagePosts";
import TrashBin from "./pages/TrashBin";
import EditProfile from "./pages/EditProfile";
import Messages from "./pages/Messages";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import RegisterAdmin from "./pages/RegisterAdmin";
import ManageAdmins from "./pages/ManageAdmins";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-post" element={<AddPost />} />
        <Route path="/admin/edit/:id" element={<EditPost />} />
        <Route path="/admin/manage-posts" element={<ManagePosts />} />
        <Route path="/admin/trash" element={<TrashBin />} />
        <Route path="/admin/profile" element={<EditProfile />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/stats" element={<Stats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route path="/admin/manage-admins" element={<ManageAdmins />} />
      </Routes>
    </Router>
  );
}
export default App;
