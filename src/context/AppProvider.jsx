import React, { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

// 🔥 Change this value whenever you want to force logout all users
const APP_VERSION = "2";

// ⏱ 8 Hours
const SESSION_DURATION = 8 * 60 * 60 * 1000;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let logoutTimer = null;

  // 🔹 Start auto logout timer
  const startLogoutTimer = (timeRemaining) => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    logoutTimer = setTimeout(() => {
      logout();
    }, timeRemaining);
  };

  // 🔹 Clear session on logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("loginTime");

    setAuthToken(null);
    setUser(null);
  };

  // 🔹 Load session on app start
  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");

    // 🔥 Force logout for all existing users
    if (storedVersion !== APP_VERSION) {
      localStorage.clear();
      localStorage.setItem("appVersion", APP_VERSION);
      setIsLoading(false);
      return;
    }

    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");
    const loginTime = localStorage.getItem("loginTime");

    if (storedToken && storedUser && loginTime) {
      const elapsed = Date.now() - Number(loginTime);

      if (elapsed < SESSION_DURATION) {
        setAuthToken(storedToken);
        setUser(JSON.parse(storedUser));
        startLogoutTimer(SESSION_DURATION - elapsed);
      } else {
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  // 🔹 Save user session
  const setUserSession = (token, userData) => {
    const now = Date.now();

    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("loginTime", now);
    localStorage.setItem("appVersion", APP_VERSION);

    setAuthToken(token);
    setUser(userData);

    startLogoutTimer(SESSION_DURATION);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        authToken,
        isLoading,
        setUserSession,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom hook
export const useAppContext = () => useContext(AppContext);
