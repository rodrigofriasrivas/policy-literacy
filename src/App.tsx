import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import EvidencePage from "./pages/EvidencePage";
import FieldOverview from "./pages/FieldOverview";
import TemporalEvolution from "./pages/TemporalEvolution";
import TopicExploration from "./pages/TopicExploration";
import PaperListing from "./pages/PaperListing";
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
          
          {/* Evidence dashboard routes with AppLayout */}
          <Route path="/evidence" element={<AppLayout><EvidencePage /></AppLayout>} />
          <Route path="/evidence/field" element={<AppLayout><FieldOverview /></AppLayout>} />
          <Route path="/evidence/temporal" element={<AppLayout><TemporalEvolution /></AppLayout>} />
          <Route path="/evidence/topic" element={<AppLayout><TopicExploration /></AppLayout>} />
          <Route path="/evidence/topic/:topicId" element={<AppLayout><TopicExploration /></AppLayout>} />
          <Route path="/evidence/papers" element={<AppLayout><PaperListing /></AppLayout>} />
          <Route path="/evidence/papers/:paperId" element={<AppLayout><PaperListing /></AppLayout>} />
          
          {/* Legacy routes redirect or handle gracefully */}
          <Route path="/temporal" element={<AppLayout><TemporalEvolution /></AppLayout>} />
          <Route path="/topic" element={<AppLayout><TopicExploration /></AppLayout>} />
          <Route path="/topic/:topicId" element={<AppLayout><TopicExploration /></AppLayout>} />
          <Route path="/papers" element={<AppLayout><PaperListing /></AppLayout>} />
          <Route path="/papers/:paperId" element={<AppLayout><PaperListing /></AppLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
