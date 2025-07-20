import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../i18n";
import { AuthProvider } from "../context/AuthContext";
import MainLayout from "../components/MainLayout";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
