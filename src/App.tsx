
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Home from "./pages/Home";
import ChildPortal from "./pages/ChildPortal";
import ParentDashboard from "./pages/ParentDashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Create auth context
type AuthContextType = {
  isAuthenticated: boolean;
  userType: 'parent' | 'child' | null;
  login: (type: 'parent' | 'child') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Protected route component
const ProtectedRoute = ({ 
  children, 
  allowedUserType 
}: { 
  children: React.ReactNode, 
  allowedUserType: 'parent' | 'child' | 'both'
}) => {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedUserType === 'both' || userType === allowedUserType) {
    return <>{children}</>;
  }
  
  return <Navigate to="/" />;
};

const queryClient = new QueryClient();

const App = () => {
  // In a real app, this would be persisted in localStorage and/or connected to Supabase
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userType: null as 'parent' | 'child' | null,
  });
  
  const login = (type: 'parent' | 'child') => {
    setAuthState({
      isAuthenticated: true,
      userType: type,
    });
  };
  
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userType: null,
    });
  };
  
  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/child" element={
                <ProtectedRoute allowedUserType="child">
                  <ChildPortal />
                </ProtectedRoute>
              } />
              <Route path="/parent" element={
                <ProtectedRoute allowedUserType="parent">
                  <ParentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
