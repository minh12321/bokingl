import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BookingProvider } from "@/contexts/BookingContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Log_s from "./pages/login-s/log_s"
import UserProfile from "./pages/user/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <BookingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}>
              <Routes>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/" element={<Index />} />
                <Route path="/lo" element={<Log_s />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BookingProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
