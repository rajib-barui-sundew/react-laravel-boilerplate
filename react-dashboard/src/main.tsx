import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./admin/components/common/PageMeta.tsx";
import { ThemeProvider } from "./admin/context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeZodErrorMap } from "./admin/lib/utils/zod-error-map.utilities.ts";

// Initialize custom Zod error map for consistent validation messages
initializeZodErrorMap();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
