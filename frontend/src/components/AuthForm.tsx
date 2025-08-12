/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function AuthForm({
  authMode,
  setAuthMode,
  formData,
  handleChange,
  handleReset,
  handleSubmit,
}: any) {
  useEffect(() => {
    handleReset();
  }, [authMode]);

  return (
    <div className="flex items-center justify-center rounded-2xl bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {authMode === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === "signup" && (
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
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {authMode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          {authMode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setAuthMode("signup")}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setAuthMode("login")}
                className="text-blue-600 hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
