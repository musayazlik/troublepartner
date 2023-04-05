import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function Wrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const sharedState = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
