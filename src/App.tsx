import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RedirectToExternal } from "@/components/RedirectToExternal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Marketing site */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Backward-compatible redirects to /dashboard/ */}
          <Route path="/evidence" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/evidence/topic" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/evidence/topic/:topicId" element={<RedirectToExternal toFn={(p) => `/dashboard/?mode=topic&topicId=${p.topicId}`} />} />
          <Route path="/evidence/field" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/evidence/temporal" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/evidence/papers" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/evidence/papers/:paperId" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/evidence/experimental" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/temporal" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/topic" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/topic/:topicId" element={<RedirectToExternal toFn={(p) => `/dashboard/?mode=topic&topicId=${p.topicId}`} />} />
          <Route path="/papers" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/papers/:paperId" element={<RedirectToExternal to="/dashboard/" />} />
          <Route path="/artefact/*" element={<RedirectToExternal to="/dashboard/" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
