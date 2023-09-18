import Header from "./Header";
import Footer from "./Footer";

export const appName = "Sample App";
import { createTheme, ThemeProvider } from "@mui/material";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#3AA6B9",
    },
    secondary: {
      main: "#FFD0D0",
    },
  },
});

function Layout({ children }: any) {
  return (
    <ThemeProvider theme={myTheme}>
      <div>
        <div className="sticky-header">
          <Header />
        </div>
        <div className="header-gap"></div>
        <div style={{}}>{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
