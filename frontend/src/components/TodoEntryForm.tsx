/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ToDoEntryForm({
  mode,
  formData,
  setFormData,
  handleChange,
  handleReset,
  handleSubmit,
}: any) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-100 p-4 gap-5">
      <div className="rounded-2xl shadow-lg p-4 w-full max-w-2xl bg-white-100 font-bold">
        {mode == "create" ? "Create Todo Entry" : "Edit Todo Entry"}
      </div>
      <div className="rounded-2xl shadow-lg p-8 w-full max-w-2xl bg-white">
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="space-y-4"
        >
          {mode === "create" && (
            <div>
              <label className="block mb-1 text-left text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-left text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600 hover:text-black transition"
          >
            {mode === "create" ? "Create Todo Entry" : "Edit Todo Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
