import { useEffect, useState } from "react";
import API from "../api";
import { Pencil, Trash2, Layers, Plus } from "lucide-react";

export default function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", icon: "" });

  // ✅ Fetch all technologies
  const fetchTechnologies = async () => {
    try {
      const res = await API.get("/technologies");
      setTechnologies(res.data);
    } catch (err) {
      console.error("Error fetching technologies:", err);
    }
  };

  // ✅ Add a new technology
  const addTechnology = async (e) => {
    e.preventDefault();
    try {
      await API.post("/technologies", formData);
      setShowModal(false);
      setFormData({ name: "", icon: "" });
      fetchTechnologies();
    } catch (err) {
      console.error("Error adding technology:", err);
    }
  };

  // ✅ Delete a technology
  const deleteTechnology = async (id) => {
    try {
      await API.delete(`/technologies/${id}`);
      fetchTechnologies();
    } catch (err) {
      console.error("Error deleting technology:", err);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return (
    <div className="ml-72 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 flex items-center gap-3">
          <Layers size={32} className="text-indigo-600" />
          Technologies
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> Add Technology
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full text-left text-gray-700 text-base">
          <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-lg">
            <tr>
              <th className="px-6 py-4">Icon</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {technologies.map((tech, idx) => (
              <tr
                key={tech._id}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50`}
              >
                {/* 🖼️ Icon */}
                <td className="px-6 py-4">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-16 h-16 object-contain border rounded-lg bg-white p-2"
                  />
                </td>

                {/* 🧠 Name */}
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {tech.name}
                </td>

                {/* ⚙️ Actions */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => console.log("Edit", tech)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all font-medium"
                    >
                      <Pencil size={18} /> Edit
                    </button>
                    <button
                      onClick={() => deleteTechnology(tech._id)}
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

        {/* Empty State */}
        {!technologies.length && (
          <div className="p-10 text-center text-gray-500 italic">
            No technologies found.
          </div>
        )}
      </div>

      {/* ✨ Add Technology Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Add New Technology
            </h2>

            <form onSubmit={addTechnology} className="space-y-4">
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
                  placeholder="React JS"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Icon URL
                </label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="https://example.com/react-icon.png"
                />
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
