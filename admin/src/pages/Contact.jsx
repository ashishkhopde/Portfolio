import { useEffect, useState } from "react";
import API from "../api";
import { Trash2, Mail, User } from "lucide-react";

export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Fetch all contact messages
  const fetchMessages = async () => {
    try {
      const res = await API.get("/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching contact messages:", err);
    }
  };

  // ✅ Delete message
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const deleteMessage = async () => {
    try {
      await API.delete(`/contact/${selectedId}`);
      setShowConfirm(false);
      setSelectedId(null);
      fetchMessages();
      alert("✅ Message deleted successfully!");
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="ml-72 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 flex items-center gap-3">
          <Mail size={32} className="text-indigo-600" />
          Contact Messages
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full text-left text-gray-700 text-base">
          <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-lg">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 w-1/2">Message</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg, idx) => (
              <tr
                key={msg._id}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50`}
              >
                {/* 👤 Name */}
                <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-2">
                  <User size={18} className="text-indigo-500" />
                  {msg.name}
                </td>

                {/* ✉️ Email */}
                <td className="px-6 py-4 text-blue-600 underline">
                  <a href={`mailto:${msg.email}`}>{msg.email}</a>
                </td>

                {/* 📝 Message */}
                <td className="px-6 py-4 text-gray-700 leading-relaxed max-w-xl whitespace-pre-wrap">
                  {msg.message.length > 200 ? (
                    <span title={msg.message} className="cursor-help">
                      {msg.message.slice(0, 200)}...
                    </span>
                  ) : (
                    msg.message
                  )}
                </td>

                {/* 🗑️ Delete Action */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => confirmDelete(msg._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all font-medium mx-auto"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {!messages.length && (
          <div className="p-10 text-center text-gray-500 italic">
            No contact messages found.
          </div>
        )}
      </div>

      {/* 🧾 Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Delete Message?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete this contact message?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={deleteMessage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
