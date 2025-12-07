import { Pencil, Trash2 } from "lucide-react";

export default function Table({ data, onEdit, onDelete }) {
  if (!data?.length)
    return (
      <div className="flex justify-center items-center h-40 bg-white rounded-xl shadow-md">
        <p className="text-gray-500 italic text-lg">No records found.</p>
      </div>
    );

  const keys = Object.keys(data[0]).filter(
    (k) => k !== "_id" && k !== "__v"
  );

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white mt-6">
      <table className="w-full text-base text-left text-gray-700">
        {/* Header */}
        <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-lg">
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className={`px-6 py-4 font-semibold ${
                  key.toLowerCase().includes("description")
                    ? "w-1/2"
                    : "min-w-[120px]"
                }`}
              >
                {key.replace(/_/g, " ")}
              </th>
            ))}
            <th className="px-6 py-4 text-center w-[160px]">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item._id}
              className={`transition-colors duration-200 ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-indigo-50`}
            >
              {keys.map((key) => (
                <td
                  key={key}
                  className={`px-6 py-4 align-top ${
                    key.toLowerCase().includes("description")
                      ? "whitespace-pre-wrap break-words leading-relaxed text-gray-800 text-base"
                      : "text-gray-700"
                  }`}
                  style={{
                    maxWidth: key.toLowerCase().includes("description")
                      ? "600px"
                      : "auto",
                  }}
                >
                  {typeof item[key] === "object"
                    ? JSON.stringify(item[key])
                    : item[key]}
                </td>
              ))}

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(item)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all font-medium"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all font-medium"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
