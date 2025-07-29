import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //Prüft beim App-start, ob Cookie vorhanden ist, also ob User eingeloggt ist
  //credential: "include", sorgt dafür, dass der Browser den Cookie mitschickt
  //
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            credentials: "include", // Cookie mitschicken
          }
        );

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <p className=" text-center text-xl p-6">Lade .....</p>;
  }
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginForm onLogin={() => setIsLoggedIn(true)} />
                )
              }
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard onLogout={() => setIsLoggedIn(false)} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/verify" element={<VerifyEmail />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
