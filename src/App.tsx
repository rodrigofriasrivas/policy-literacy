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

          {/* Backward-compatible redirects to /artefact/index.html */}
          <Route path="/evidence" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/evidence/topic" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/evidence/topic/:topicId" element={<RedirectToExternal toFn={(p) => `/artefact/index.html?mode=topic&topicId=${p.topicId}`} />} />
          <Route path="/evidence/field" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/evidence/temporal" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/evidence/papers" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/evidence/papers/:paperId" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/evidence/experimental" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/temporal" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/topic" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/topic/:topicId" element={<RedirectToExternal toFn={(p) => `/artefact/index.html?mode=topic&topicId=${p.topicId}`} />} />
          <Route path="/papers" element={<RedirectToExternal to="/artefact/index.html" />} />
          <Route path="/papers/:paperId" element={<RedirectToExternal to="/artefact/index.html" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
