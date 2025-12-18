import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [contributions, setContributions] = useState([]);

  const addContribution = (contribution) => {
    setContributions((prev) => [contribution, ...prev]);
  };

  return (
    <AppContext.Provider value={{ contributions, addContribution }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
