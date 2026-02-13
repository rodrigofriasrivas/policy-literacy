import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import FieldOverview from "./pages/FieldOverview";
import TemporalEvolution from "./pages/TemporalEvolution";
import TopicExploration from "./pages/TopicExploration";
import PaperListing from "./pages/PaperListing";
import ExperimentalView from "./pages/ExperimentalView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Homepage with HomeLayout (no AppLayout) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Dashboard routes with AppLayout */}
          {/* /evidence redirects to /evidence/topic (Evidence tab) */}
          <Route path="/evidence" element={<Navigate to="/evidence/topic" replace />} />
          <Route path="/evidence/topic" element={<TopicExploration />} />
          <Route path="/evidence/topic/:topicId" element={<TopicExploration />} />
          <Route path="/evidence/field" element={<AppLayout><FieldOverview /></AppLayout>} />
          <Route path="/evidence/temporal" element={<AppLayout><TemporalEvolution /></AppLayout>} />
          <Route path="/evidence/papers" element={<AppLayout><PaperListing /></AppLayout>} />
          <Route path="/evidence/papers/:paperId" element={<AppLayout><PaperListing /></AppLayout>} />
          <Route path="/evidence/experimental" element={<AppLayout><ExperimentalView /></AppLayout>} />
          
          {/* Legacy routes redirect to new structure */}
          <Route path="/temporal" element={<Navigate to="/evidence/temporal" replace />} />
          <Route path="/topic" element={<Navigate to="/evidence/topic" replace />} />
          <Route path="/topic/:topicId" element={<Navigate to="/evidence/topic/:topicId" replace />} />
          <Route path="/papers" element={<Navigate to="/evidence/papers" replace />} />
          <Route path="/papers/:paperId" element={<Navigate to="/evidence/papers/:paperId" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
