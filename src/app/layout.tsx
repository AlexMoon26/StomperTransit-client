import { CircularProgress, ThemeProvider } from "@mui/material";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { Inter } from "next/font/google";
import { theme } from "@/theme/theme";

import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modalContext";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stomper Transit",
  description: "Грузоперевозки",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body className={`${inter.className} text-xs md:text-sm xxl:text-lg`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <Suspense fallback={<CircularProgress />}>{children}</Suspense>
            </ModalProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Toaster position="bottom-right" richColors theme="system" />
      </body>
    </html>
  );
}
