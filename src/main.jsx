import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./styles/theme";
import GlobalStyles from "./styles/global";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./hooks/Auth";
import { ToastContainer } from "react-toastify";
import { Routes } from "./routes";
import { MenuProvider } from "./hooks/SideMenu";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={3}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition:Slide
    />
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <MenuProvider>
          <Routes />
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
