import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
interface Props {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Nicht eingeloggt");
        }
        const data = await response.json();
        setUser(data);
        //console.log("data", data);
      } catch (error) {
        console.error("Fehler beim Laden", error);
        onLogout();
      }
    };
    fetchProfile();
  }, [onLogout]);

  //HandleLogout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Nicht eingeloggt");
      }
      onLogout();
      navigate("/");
    } catch (error) {
      console.error("Fehler beim logout", error);
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-2xl text-center font-semibold mb-4">
        🎉 Hallo{" "}
        <span className="text-gray-500 text-2xl font-bold">
          {user?.username}
        </span>
        , du bist eingeloggt! 🎊
      </h2>
      <div className="justify-items-start gap-3 items-start text-center pb-4">
        <p className="font-sans p-2 text-blue-500">
          {" "}
          <span className="text-gray-500 text-m font-bold"> Username </span>
          {user?.username}
        </p>
        <p className="font-sans p-2 text-blue-500">
          {" "}
          <span className="text-gray-500 text-m font-bold"> Email: </span>
          {user?.email}
        </p>
        <p className="font-sans p-2 text-blue-500">
          {" "}
          <span className="text-gray-500 text-m font-bold"> Roles: </span>
          {user?.roles.join(", ").toLowerCase()}
        </p>
        <p className="font-sans p-2 text-blue-500">
          {" "}
          <span className="text-gray-500 text-m font-bold"> Permissions: </span>
          {user?.permissions.join().toLowerCase()}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-pink-400"
      >
        Ausloggen
      </button>
    </div>
  );
};

export default Dashboard;
