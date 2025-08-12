/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import "./App.css";
import { useAppSelector } from "./store/hooks";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";
import NavigationBar from "./components/NavigationBar";

function App() {
  const isAuthenticated = useAppSelector(
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <>
                <NavigationBar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
