import { useState, useEffect } from "react";
import API from "../api";
import { Pencil, Trash2, ExternalLink, Github, Plus } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    source_code_link: "",
    live_link: "",
  });

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // ✅ Add a new project
  const addProject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects", formData);
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        image: "",
        source_code_link: "",
        live_link: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  // ✅ Delete a project
  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="ml-72 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Projects</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full text-left text-gray-700 text-base">
          <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-lg">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 w-1/2">Description</th>
              <th className="px-6 py-4 text-center">Links</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, idx) => (
              <tr
                key={project._id}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50`}
              >
                {/* 🖼️ Image */}
                <td className="px-6 py-4">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                </td>

                {/* 📛 Name */}
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {project.name}
                </td>

                {/* 📝 Description */}
                <td className="px-6 py-4 text-gray-700 leading-relaxed max-w-xl whitespace-pre-wrap">
                  {project.description.length > 200 ? (
                    <span title={project.description} className="block cursor-help">
                      {project.description.slice(0, 200)}...
                    </span>
                  ) : (
                    project.description
                  )}
                </td>

                {/* 🔗 Links */}
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col gap-2 items-center">
                    <a
                      href={project.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg font-medium transition"
                    >
                      <Github size={18} /> Code
                    </a>
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-lg font-medium transition"
                    >
                      <ExternalLink size={18} /> Live
                    </a>
                  </div>
                </td>

                {/* ⚙️ Actions */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => console.log("Edit", project)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all font-medium"
                    >
                      <Pencil size={18} /> Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all font-medium"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!projects.length && (
          <div className="p-10 text-center text-gray-500 italic">
            No projects found.
          </div>
        )}
      </div>

      {/* ✨ Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-2xl relative">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Add New Project
            </h2>

            <form onSubmit={addProject} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Source Code Link
                  </label>
                  <input
                    type="text"
                    name="source_code_link"
                    value={formData.source_code_link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        source_code_link: e.target.value,
                      })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Live Link
                  </label>
                  <input
                    type="text"
                    name="live_link"
                    value={formData.live_link}
                    onChange={(e) =>
                      setFormData({ ...formData, live_link: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
