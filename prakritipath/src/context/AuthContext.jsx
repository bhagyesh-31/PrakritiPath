import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // Mock authentication
    const mockUser = {
      id: Date.now(),
      name: "Eco User",
      email,
      role: "student",
      xp: 0,
      streak: 0,
    };
    setUser(mockUser);
    navigate("/dashboard");
  };

  const signup = (name, email, password, role) => {
  const mockUser = {
    id: Date.now(),
    name,
    email,
    role,
    school: "Green Valley School",
    district: "Pune",
    state: "Maharashtra",
    xp: 0,
    streak: 0,
  };
  setUser(mockUser);
  navigate("/dashboard");
};


  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
