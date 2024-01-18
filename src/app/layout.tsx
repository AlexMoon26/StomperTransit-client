import { ThemeProvider } from "@mui/material";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { Inter } from "next/font/google";
import { theme } from "@/theme/theme";
import { Providers } from "@/GlobalRedux/provider";

import { ToastContainer } from "react-toastify";
import { Middleware } from "@/config/middleware";

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
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className={`${inter.className} text-xs md:text-sm xxl:text-lg`}>
        <Providers>
          <Middleware>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </Middleware>
        </Providers>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
