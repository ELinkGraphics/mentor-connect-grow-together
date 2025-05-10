
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindMentors from "./pages/FindMentors";
import Dashboard from "./pages/Dashboard";
import MentorDashboard from "./pages/MentorDashboard";
import MentorProfile from "./pages/MentorProfile";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  // Create a new QueryClient instance inside the component function
  // to ensure proper React context
  const queryClient = new QueryClient();
  
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/find-mentors" element={
                <ProtectedRoute>
                  <FindMentors />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/mentor-dashboard" element={
                <ProtectedRoute requiredRole="mentor">
                  <MentorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/mentor/:id" element={
                <ProtectedRoute>
                  <MentorProfile />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
